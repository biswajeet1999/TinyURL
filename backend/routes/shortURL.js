const router = require("express").Router();
const {
  generateShortURL,
  redirectUrl,
  extractUrl,
} = require("../controllers/shortURL");

router.param("url", extractUrl);
router.post("/getShortUrl", generateShortURL);
router.get("/:url", redirectUrl);

module.exports = router;
