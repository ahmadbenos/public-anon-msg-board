const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const moment = require("moment");
var date = moment().add(3, "hour").format("LT");

// Load user model
const User = require("../models/User");

// Get all messages!
router.get("/", (req, res) => {
  User.find({}, (err, response) => {
    if (err) {
      throw err;
    } else {
      res.render("index", {
        response,
      });
    }
  });
});

// send a message
router.post("/send", (req, res) => {
  let errors = [];
  const message = req.body.message;

  console.log(date);
  User.find({}, (err, response) => {
    //if message is empty
    if (!message) {
      errors.push({ msg: "you can't send an empty text -_-" });
    }

    if (errors.length > 0) {
      res.render("index", {
        errors,
        response,
      });
    } else {
      const newMessage = new User({
        message,
        date,
      });

      newMessage
        .save()
        .then((msg) => {
          console.log("Message sent!");
          res.redirect("/");
        })
        .catch((error) => {
          if (error) console.log(error);
        });
    }
  });
});

module.exports = router;
