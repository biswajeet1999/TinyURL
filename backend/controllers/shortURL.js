const urlModel = require("../models/url");
const { port, baseUrl } = require("../config");

const symbols =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%?.";
const symbolLength = symbols.length;

const generateUrl = () => {
  // generate tiny url between length 5 to 10
  let length = 5 + Math.floor((Math.random() * 10) % 5);
  let tinyUrl = "";
  for (let i = 1; i <= length; i++) {
    let index = Math.floor(Math.random() * 100) % symbolLength;
    tinyUrl += symbols[index];
  }
  return tinyUrl;
};

const isShortUrlExist = (shortUrl, url) => {
  return new Promise((res, rej) => {
    urlModel
      .findOne({ shortUrl })
      .then((obj) => {
        if (obj) {
          // obj found
          res({ status: true });
        }
        new urlModel({ shortUrl, longUrl: url })
          .save()
          .then((urlObj) => {
            res({ status: false, obj: urlObj });
          })
          .catch((err) => {
            res({ err: "Unable to generate Short Url" });
          });
      })
      .catch((err) => {
        res({ err: "Some error occured" });
      });
  });
};

const isLongUrlExists = (url) => {
  return new Promise((res, rej) => {
    urlModel
      .findOne({ longUrl: url })
      .then((obj) => {
        if (!obj) {
          res({ status: false });
        }
        res({ status: true, obj });
      })
      .catch((err) => {
        res({ err });
      });
  });
};

exports.generateShortURL = async (req, res) => {
  const { url } = req.body;

  const longUrlFlag = await isLongUrlExists(url);
  if (longUrlFlag.err) {
    return res.json({ err: "Hi Unable to generate shortUrl" });
  }
  if (longUrlFlag.status) {
    // found
    return res.json({
      shortUrl: `${baseUrl}${port}/${longUrlFlag.obj.shortUrl}`,
    });
  }

  while (true) {
    let shortUrl = generateUrl();
    let result = await isShortUrlExist(shortUrl, url);

    if (result.err) {
      return res.json({ err: "Unable to generate shortUrl" });
    }
    if (!result.status) {
      // duplicate not found
      return res.json({
        shortUrl: `${baseUrl}${port}/${result.obj.shortUrl}`,
      });
    }
  }
};

exports.extractUrl = (req, res, next, url) => {
  const shortUrl = url;
  // console.log(shortUrl);

  if (shortUrl === "") {
    return res.json({ err: "Invallid Url" });
  }
  urlModel.findOne({ shortUrl }).then((obj) => {
    // console.log(obj);
    if (!obj) {
      return res.json({ err: "Not found" });
    }
    req.url = obj;
    next();
  });
};

exports.redirectUrl = (req, res) => {
  return res.status(301).redirect(req.url.longUrl); // to work this long url most contain http or https protocol
};
