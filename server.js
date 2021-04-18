const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require("dotenv").config()

// // CORS-enabled for only localhost:8081
// var corsOptions = {
//   origin: "http://localhost:8081",
// };

app.use(cors);

// BodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express to send static files to client
app.use(express.static(path.join(__dirname, "client", "build")))

const port = process.env.PORT || 8080;
const secret = process.env.SECRET || "hello secret";
const mongo_uri = process.env.MONGODB_URI;

app.get("/", (req, res) => {
  res.json({ message: "Hello server!" });
});

require("./routes/listingRoutes.js")(app);

// catch-all, send the main index.html file back to the client if it didn't receive an unrecognized request
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// The app.listen() function is used to bind and listen the connections on the specified host and port.
app.listen(port, () => {
  console.log(`App listening at ${port}`);
});

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${mongo_uri}`,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

