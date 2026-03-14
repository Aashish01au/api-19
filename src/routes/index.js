const authRouter = require("../app/auth/auth.router")

const routes = require("express").Router()
routes.use("/auth",authRouter)
module.exports = routes