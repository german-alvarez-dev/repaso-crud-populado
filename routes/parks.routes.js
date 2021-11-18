const express = require("express");
const router = express.Router();
const Park = require("../models/Park.model");

router.get("/parks", (req, res) => {
  Park.find().then((parks) => {
    res.render("pages/parks/parks", { parks });
  });
});

router.get("/create", (req, res) => {
  Park.find().then((parks) => {
    res.render("pages/parks/new-park", { parks });
  });
});

router.post("/create", (req, res) => {
  const { name, description } = req.body;

  Park.create({ name, description })
    .then((park) => {
      res.redirect("/parks/parks");
    })
    .catch(() => res.render("parks/new-park"));
});

module.exports = router;
