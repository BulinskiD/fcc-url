import { parseUrl, UrlParsingError } from "./parseUrl";

describe("parseUrl", () => {
  it("should return url when input is valid", () => {
    const validUrl = "https://www.google.com";
    expect(parseUrl(validUrl)).toBe(validUrl);
  });

  const invalidUrls = ["ftp://google.com", "invalidUrl"];

  it.each(invalidUrls)(
    "should throw an error when input is '%s'",
    (invalidUrl) => {
      try {
        expect(parseUrl(invalidUrl)).toThrowError();
      } catch (error) {
        expect(error).toEqual(new UrlParsingError("invalid url"));
      }
    }
  );
});
