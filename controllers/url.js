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
    return res.status(404).send("URL not found"); 
  }

  res.redirect(entry.redirectUrl);
};

const shortUserUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortID = shortid.generate();

  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.render("home", {
    id: shortID,
  });
};

module.exports = {
  getUrlusers,
  shortUserUrl,
};
