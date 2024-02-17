const express = require("express");
const router = express.Router();
const { shortUserUrl } = require("../controllers/url");
const { getUrlusers } = require("../controllers/url");
const { getAnalytics } = require("../controllers/url");

router.post("/", shortUserUrl);
router.get("/:shortId", getUrlusers);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
