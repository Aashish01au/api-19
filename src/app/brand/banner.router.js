const { ROLES } = require("../../constant/constant")
const auth = require("../../middleware/auth.middleware")
const permissionCheck = require("../../middleware/rbac.middleware")
const { uploaderPath, uploader } = require("../../middleware/uploaders.middleware")
const bodyValidator = require("../../middleware/validator.middleware")
const brandCtrl = require("./brand.controller")
const { createBrandSchema, updateBrandSchema } = require("./brand.request")

const brandRouter = require("express").Router()
brandRouter.get("/home",brandCtrl.homeList)
brandRouter.route("/")
    .get(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),brandCtrl.index)
    .post(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),uploaderPath("Brand"),uploader.single("image"),bodyValidator(createBrandSchema,"image"),brandCtrl.create)

brandRouter.route("/:id")
    .get(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),brandCtrl.detail)
    .put(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),uploaderPath("image"),uploader.single("image"),bodyValidator(updateBrandSchema,"image"),brandCtrl.update)
    .delete(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),brandCtrl.delete)
    
module.exports = brandRouter