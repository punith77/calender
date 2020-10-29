const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "patients",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model("appointments", AppointmentSchema);
module.exports = Appointment;
