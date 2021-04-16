const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// CORS-enabled for only localhost:8081
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// BodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({ message: "Hello server!" });
});

require("./routes/listingRoutes.js")(app);

// The app.listen() function is used to bind and listen the connections on the specified host and port.
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/foodpacked_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", function () {
  console.log("Connected to database!");
});
db.on("error", console.error.bind(console, "Connection error:"));
