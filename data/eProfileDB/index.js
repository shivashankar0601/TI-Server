/**
 * Author: Hrishita Mavani
 * Feature: Blog Management
 */

const EProfile = require("../../models/eProfileModel/index");

/** 
 * This function does all the operations on blog collection
 * @param {*} req : The request passsed as a parameter to the function blogDB
 * @returns : The function returns the Blog model
 */



exports.saveEProfile = function (req, res) {
  const insertBlogData = new EProfile();
  const { blog_id, author_id, title, content, image, destination_tag } =
    req.body;

  (insertBlogData.blog_id = blog_id),
    (insertBlogData.author_id = author_id),
    (insertBlogData.title = title),
    (insertBlogData.content = content),
    (insertBlogData.image = image),
    (insertBlogData.destination_tag = destination_tag);

  insertBlogData.save(function (err, blog) {
    if (err) {
      res.send(err);
    }
    res.json(blog);
  });
};



exports.findEProfileByEmailID = function (req, res) {
  let  userID  = req.body.author_id;
  EProfile.find({author_id:  userID }, function (err, blog) {
    if (err) {
      res.send(err);
    }
    res.json(blog);
  });
};
