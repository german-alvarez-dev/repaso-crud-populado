const express = require("express");
const router = express.Router();
const Coaster = require("../models/Coaster.model");

const Park = require("../models/Park.model");

router.get("/coasters", (req, res) => {
  Coaster.find()
    .populate("park_id")
    .then((coasters) => {
      console.log(coasters);
      res.render("pages/coasters/coasters", { coasters: coasters });
    });
});

router.get("/create", (req, res) => {
  Coaster.find()
    .populate("park_id")
    .then((allparks) => {
      res.render("pages/coasters/new-coaster", { allparks });
    });
});

router.post("/create", (req, res) => {
  const { name, description, inversions, length, park_id } = req.body;
  Coaster.create({ name, description, inversions, length, park_id })
    .then((coaster) => {
      res.redirect("/coasters/coasters");
    })

    .catch((err) => {
      console.log(err);
    });
});

router.get("/details/:id", (req, res) => {
  const { id } = req.params;
  Coaster.findById(id)
    .populate("park_id")
    .then((coaster) => {
      console.log(coaster);
      res.render("pages/coasters/coaster-details", coaster);
    });
});

router.get("/delete/:id", (req, res) => {
  const { id } = req.params;

  Coaster.findByIdAndRemove(id).then(() => res.redirect("/coasters/coasters"));
});

router.get("/edit/:id", (req, res) => {
  const { id } = req.params;

  Park.find().then((allParks) => {
    Coaster.findById(id)
      .populate("park_id")
      .then((coaster) => {
        console.log({ allParks });
        res.render("pages/coasters/edit-coaster", { coaster, allParks });
      });
  });
});

router.post("/edit/:id", (req, res) => {
  const { id } = req.params;

  Coaster.findByIdAndUpdate(id, req.body).then((updatedCeleb) => {
    res.redirect("/coasters/coasters");
  });
});

module.exports = router;
