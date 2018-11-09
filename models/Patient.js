const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema ({
firstName: {
  type: String,
  required: true
},
lastName: {
  type: String,
  required: true
},
dateOfBirth: {
  type: String
}
})
const Patient = mongoose.model('patients', patientSchema);
module.exports = Patient;
