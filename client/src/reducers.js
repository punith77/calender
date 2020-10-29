import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import patientsReducer from "./containers/Patients/ducks";
import individualPatientsReducer from "./containers/Profile/ducks";
import appointmentsReducer from "./containers/Schedule/ducks";
// import searchReducer from './containers/searchbar/ducks';

const appReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  getPatients: patientsReducer,
  patientProfile: individualPatientsReducer,
  getAppointments: appointmentsReducer,
});
export default appReducer;
