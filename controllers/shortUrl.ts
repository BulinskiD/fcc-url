import express = require("express");
import { Url, UrlType } from "../model/URL";
import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

const router = express.Router();

function parseUrl(url: string): string {
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

router.post<ParamsDictionary, UrlType, { url: string }>(
  "/",
  async (req, res, next) => {
    const { url: original_url } = req.body;
    try {
      const count = await Url.count();
      const short_url = count + 1;
      parseUrl(original_url);
      const url = new Url({
        original_url,
        short_url: count + 1,
      });
      await url.save();
      res.status(201).json({ original_url, short_url });
    } catch (error) {
      next(error);
    }
  }
);

router.get<ParamsDictionary, void>("/:short_url", async (req, res, next) => {
  try {
    const page = await Url.findOne({ short_url: Number(req.params.short_url) });
    if (page) {
      return res.redirect(page.original_url);
    }
    next(new Error("Url not found!"));
  } catch (error) {
    next(error);
  }
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message });
});

export { router };
