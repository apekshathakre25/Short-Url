const shortid = require("shortid");
const URL = require("../models/url");

const getUrlusers = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).send("URL not found"); // Handle case where short URL doesn't exist
  }

  res.redirect(entry.redirectUrl);
};

const shortUserUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = shortid.generate(); // Generate short ID dynamically

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  res.json({ shortUrl: shortId });
};

module.exports = {
  getUrlusers,
  shortUserUrl,
};
