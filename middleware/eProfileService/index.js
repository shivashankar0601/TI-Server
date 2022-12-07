
const eProfileDB = require("../../data/eProfileDB/index");

exports.saveEProfile = function (req, res) {
  eProfileDB.saveEProfile(req, res);
};


exports.findEProfileByEmailID = function (req, res) {
  eProfileDB.findEProfileByEmailID(req, res);
};