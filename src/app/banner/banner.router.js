const { ROLES } = require("../../constant/constant")
const auth = require("../../middleware/auth.middleware")
const permissionCheck = require("../../middleware/rbac.middleware")
const { uploaderPath, uploader } = require("../../middleware/uploaders.middleware")
const bodyValidator = require("../../middleware/validator.middleware")
const bannerCtrl = require("./banner.controller")
const { createBannerSchema } = require("./banner.request")

const bannerRouter = require("express").Router()
bannerRouter.get("/home",bannerCtrl.homeList)
bannerRouter.route("/")
    .get(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),bannerCtrl.index)
    .post(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),uploaderPath("Banner"),uploader.single("image"),bodyValidator(createBannerSchema,"image"),bannerCtrl.create)

bannerRouter.route("/:id")
    .get(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),bannerCtrl.detail)
    .put(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]))
    .delete(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),bannerCtrl.delete)
    
module.exports = bannerRouter