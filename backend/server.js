const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// CORS-enabled for only localhost:8081
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

const port = 8000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Cannot connect to database!", err);
    process.exit();
  });

const db = mongoose.connection;
