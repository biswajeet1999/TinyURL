const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes/shortURL");
const { port } = require("./config");

mongoose.connect(
  "mongodb://localhost:27017/shortURL",
  { useNewUrlParser: true },
  function (err) {
    if (err) {
      console.log("Unable to connect to database");
    }
    console.log("Database connected");
  }
);

app.use(cors());
app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
