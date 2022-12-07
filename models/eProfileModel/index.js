const mongoose = require("mongoose");


const eProfileSchema = new mongoose.Schema({
  email_id: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  portfolioUrl: { type: String },
  phoneNumber: { type: Number, required: true },
  fbURL: { type: String },
  instaURL: { type: String },
  linkedInURL: { type: String },
});

const EProfile = mongoose.model("eProfile", eProfileSchema);

/**
 * The module is being exported as 'Blog'
 * so that this module can be imported into other modules.
 */

module.exports = EProfile;
