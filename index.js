const express = require("express");
const { connectToDb } = require("./connection");
const urlRouter = require("./routes/url");

const app = express();
const port = 7502;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/url", urlRouter);

connectToDb("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("mongoDB Connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);
