
const eProfileRouter = require("express").Router();
const eProfileService = require("../../middleware/eProfileService");


eProfileRouter.post("/saveEProfile", eProfileService.saveEProfile);
eProfileRouter.post("/findEProfileByEmailID", eProfileService.findEProfileByEmailID);

module.exports = eProfileRouter;