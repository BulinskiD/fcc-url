import { Express } from "express";
import request from "supertest";
import { router } from "./shortUrl";
import { appFactory } from "../serverFactory";
import { Url } from "../model/URL";

let app: Express;
app = appFactory([{ path: "/api/shorturl", handlers: [router] }]);

describe("shortUrlController", () => {
  it("should return 302 for correct url", async () => {
    const url = new Url({ original_url: "https://www.wp.pl", short_url: 1 });
    await url.save();
    await request(app)
      .get("/api/shorturl/1")
      .expect(302)
      .expect(({ headers }) => {
        expect(headers.location).toBe("https://www.wp.pl");
      });
  });

  it("should return 400 for invalid url", async () => {
    await request(app).get("/api/shorturl/2").expect(400);
  });

  it("should correctly create new url", async () => {
    await request(app)
      .post("/api/shorturl")
      .send({ url: "https://www.google.com" })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toEqual({
          original_url: "https://www.google.com",
          short_url: 2,
        });
      });
  });

  it("should return 400 when url is not valid", async () => {
    await request(app)
      .post("/api/shorturl")
      .send({ url: "invalidUrl" })
      .expect(400)
      .expect(({ body }) => {
        expect(body).toEqual({
          error: "invalid url",
        });
      });
  });
});
