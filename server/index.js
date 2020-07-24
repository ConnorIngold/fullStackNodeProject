const express = require("express")
const morgan = require("morgan")

const app = express()

// const auth = require("./auth/index.js")
const auth = require("./auth")

const cors = require("cors")


require("dotenv").config()
require("./db/connection")

app.use(morgan("dev"))
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    "message": "🦄🌈✨  Hello World!   🌈✨🦄",
  })
})

app.use(
  cors({
    origin: "http://localhost:8080",
  }),
)

app.use( "/auth", auth)

const notFound = (req, res, next) => {
  res.status(404)
  const error = new Error("Not Found - " + req.originalUrl)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500)
  res.json({
    message: err.message,
    stack: err.stack,
  })
}

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(3000, () => {
  console.log("Listening on port", port)
})
