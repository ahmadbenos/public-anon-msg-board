const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");

// URL parser
app.use(express.urlencoded({ extended: false }));

//Connect to Mongoose
const db = require("./config/keys").MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Initialize view engine!
app.use(expressLayouts);
app.set("view engine", "ejs");

// routes
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
