const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//DB Config
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Body parser
// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/patients", require("./routes/patients.js"));
app.use("/appointments", require("./routes/appointment.js"));

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => console.log("server running on port 7777"));
