const shortid = require("shortid");
const URL = require("../models/url");

const getUrlusers = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).send("URL not found");
  }

  res.redirect(entry.redirectUrl);
};

const shortUserUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({
    id: shortId,
  });
};

const getAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getUrlusers,
  shortUserUrl,
  getAnalytics
};
