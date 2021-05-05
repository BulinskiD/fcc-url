const express = require("express");
const { Url } = require("../model/URL");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { original_url } = req.body;
  try {
    const count = await Url.count();
    const short_url = count + 1;
    new URL(original_url);
    const url = new Url({ original_url, short_url: count + 1 });
    await url.save();
    res.status(201).json({ original_url, short_url });
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
