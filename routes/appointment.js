const appointmentRouter = require("express").Router();
const mongoose = require("mongoose");
const moment = require("moment");
const MomentRange = require("moment-range");
const momentRange = MomentRange.extendMoment(moment);

const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");

appointmentRouter.get("/", (req, res, next) => {
  const searchDate = req.query.date;

  Appointment.find({ date: searchDate })
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => res.status(500).json("Unable to fetch appointments"));
});

appointmentRouter.post("/addAppointment", async (req, res) => {
  let rangeDates = [];

  let isAdded = false;
  const startDate = req.body.date;
  let endDate;

  if (req.body.repeat) {
    endDate = req.body.endDate;
  } else {
    endDate = startDate;
  }

  const range = momentRange.range(moment(startDate), moment(endDate));
  Array.from(range.by("week")).forEach((date) => {
    rangeDates.push(date.format("YYYY-MM-DD"));
  });
  // res.send(rangeDates);
  const addedAppointments = await Promise.all(
    rangeDates.map(async (processingDate) => {
      // data to be added
      let appointmentFields = {};
      appointmentFields.patient = req.body.id;
      appointmentFields.firstName = req.body.firstName;
      appointmentFields.lastName = req.body.lastName;
      appointmentFields.date = processingDate;
      appointmentFields.startTime = req.body.time;
      const endTime = moment(req.body.time, "HH-mm")
        .add(req.body.duration, "minutes")
        .format("HH:mm");
      appointmentFields.endTime = endTime;
      const events = await Appointment.find({ date: processingDate });
      events.push(appointmentFields);
      const checkOverlap = () => {
        const data = events;
        let isOverlapping;
        let start = [];
        data.forEach((e) => {
          let d = [e.startTime, e.endTime];
          start.push(d);
        });
        // sorted the time
        start.sort();
        start.forEach((e, i) => {
          if (start[i + 1]) {
            if (e[1] > start[i + 1][0]) {
              isOverlapping = true;
            } else {
              isOverlapping = false;
            }
          }
        });
        return isOverlapping;
      };

      if (checkOverlap()) {
        isAdded = false;
        return { ...appointmentFields, isAdded };
      } else {
        const newAppointment = new Appointment(appointmentFields);

        const result = await newAppointment.save();
        if (result) {
          isAdded = true;
          return { ...appointmentFields, isAdded };
        }
      }
    })
  );
  res.send(addedAppointments);
});

appointmentRouter.delete("/deleteAppointment", (req, res) => {
  const appointmentId = req.query.appointmentId;

  Appointment.find({ _id: appointmentId })
    .remove()
    .then((result) => res.status(200).json({ status: "removed", data: result }))
    .catch((err) => res.status(500).json("Unable to delete appointment"));
});
module.exports = appointmentRouter;
