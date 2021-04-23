const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require("dotenv").config()

// // CORS-enabled for only localhost:8081
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// BodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
const secret = process.env.SECRET || "hello secret";
const mongo_uri = process.env.MONGODB_URI || "mongodb+srv://foodpacked-admin:WSw9wUzXOHvXHVCI@foodpacked-southeast.4awmu.mongodb.net/foodpacked-db?retryWrites=true&w=majority";

require(__dirname + "/server/listingRoutes.js")(app);

// Express to send static files to client
app.use(express.static(path.join(__dirname, "client", "build")))

// catch-all, send the main index.html file back to the client if it didn't receive an unrecognized request
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/", (req, res) => {
  res.json({ message: "Hello server!" });
});

// The app.listen() function is used to bind and listen the connections on the specified host and port.
app.listen(port, () => {
  console.log(`App listening at ${port}`);
});

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(`${mongo_uri}`,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
