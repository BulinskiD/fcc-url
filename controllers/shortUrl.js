const express = require("express");
const { Url } = require("../model/URL");

const router = express.Router();

function parseUrl(url) {
  try {
    new URL(url);
  } catch (error) {
    throw new Error("invalid url");
  }
  if (url.includes("http")) {
    return url;
  }
  throw new Error("invalid url");
}

router.post("/", async (req, res, next) => {
  const { url: original_url } = req.body;
  try {
    const count = await Url.count();
    const short_url = count + 1;
    parseUrl(original_url);
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
