const patientsRouter = require("express").Router();
const Patient = require("../models/Patient");

patientsRouter.use("/:patientId/profile", require("./profile"));

patientsRouter.get("/", (req, res, next) => {
  Patient.find()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
});

patientsRouter.post("/register", (req, res) => {
  const newPatient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
  });
  newPatient
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(400).json(err));
});

module.exports = patientsRouter;
