const express = require("express")
const router = express.Router()
const Joi = require("joi")
const mongoose = require("mongoose")

// const db = require("../db/connection")
const User = require("../db/user.model")

const bcrypt = require("bcryptjs")

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_])*$/)
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().trim().min(8).required(),
  developer: Joi.boolean(),
  admin: Joi.boolean(),
})

router.get("/", (req, res,) => {
  res.json({"msg": "hello word"})
})

router.post("/signup", (req, res, next) => {
  console.log("body", req.body)
  const result = Joi.validate(req.body, schema)
  if(result.error === null){
    // username is unique
    User.findOne({
      username: req.body.username,
    }).then((user) => {
      if (user) {
        // if there is a user return a error
        const error = new Error("That username is already in use")
        next(error)
      } else {
          let username = req.body.username
          let password = req.body.password
          let developer = req.body.developer === undefined ? req.body.developer = false : req.body.developer = true
          let admin = req.body.admin === undefined ? req.body.admin = false : req.body.admin = true
        // else gen hash
          bcrypt.hash(password, 10, (err, hash) => {
            let newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              username: username,
              password: hash,
              developer: developer,
              admin: admin,
            })

            newUser.save((err, newUser) => {
              if (err) {
                return res.send({
                  success: false,
                  message: "Server error: " + err,
                })
              }
              // else
              return res.json(newUser).status(200)
            })
          })
      }
    }).catch(err => console.log(err))
  } else {
    next(result.error)
  }
})

module.exports = router