const { ROLES } = require("../../constant/constant")
const auth = require("../../middleware/auth.middleware")
const permissionCheck = require("../../middleware/rbac.middleware")
const { uploaderPath, uploader } = require("../../middleware/uploaders.middleware")
const bodyValidator = require("../../middleware/validator.middleware")
const categoryCtrl = require("./category.controller")
const { createCategorySchema, updateCategorySchema } = require("./category.request")

const categoryRouter = require("express").Router()
categoryRouter.get("/home",categoryCtrl.homeList)
categoryRouter.route("/")
    .get(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),categoryCtrl.index)
    .post(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),uploaderPath("Category"),uploader.single("image"),bodyValidator(createCategorySchema,"image"),categoryCtrl.create)

categoryRouter.route("/:id")
    .get(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),categoryCtrl.detail)
    .put(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),uploaderPath("image"),uploader.single("image"),bodyValidator(updateCategorySchema,"image"),categoryCtrl.update)
    .delete(auth,permissionCheck([ROLES.ADMIN,ROLES.CUSTOMER]),categoryCtrl.delete)
    
module.exports = categoryRouter