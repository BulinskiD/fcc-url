const express = require("express");
const { Url } = require("../model/URL");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { original_url } = req.body;
  try {
    new URL(original_url);
    const url = new Url(req.body);
    await url.save();
    res.status(201).json(url);
  } catch (error) {
    next(error);
  }
});

router.get("/:short_url", async (req, res, next) => {
  try {
    const page = await Url.findOne({ short_url: req.params.short_url });
    return res.redirect(page.original_url);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

module.exports = { router };
