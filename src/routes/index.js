const authRouter = require("../app/auth/auth.router")
const bannerRouter = require("../app/banner/banner.router")
const brandRouter = require("../app/brand/banner.router")
const categoryRouter = require("../app/category/category.router")

const routes = require("express").Router()
routes.use("/auth",authRouter)
routes.use("/banner", bannerRouter)
routes.use("/brand",brandRouter)
routes.use("/category",categoryRouter)
module.exports = routes