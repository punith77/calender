const profileRouter = require('express').Router({ mergeParams: true });
const Patient = require('../models/Patient');
profileRouter.get('/', (req,res) => {
  const patientId = req.params.patientId

  Patient.findById(patientId)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
})

profileRouter.patch('/', (req,res) => {
  const patientId = req.params.patientId;
  const updateData = req.body;

  Patient.findOneAndUpdate( {_id:  patientId }, updateData)
  .then((result) => res.status(200).json(result))
  .catch((err) => res.status(400).json(err));
})

profileRouter.delete('/', (req,res) => {
  const patientId = req.params.patientId;

  Patient.find({_id: patientId}).remove()
  .then((result) => res.status(200).json({status: 'removed', data:result}))
  .catch((err) => res.status(400).json(err));
  
})
module.exports = profileRouter;
