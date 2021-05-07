class UrlParsingError extends Error {}

function parseUrl(url: string): string {
  try {
    new URL(url);
  } catch (error) {
    throw new UrlParsingError("invalid url");
  }
  if (url.includes("http")) {
    return url;
  }
  throw new UrlParsingError("invalid url");
}

export { UrlParsingError, parseUrl };
