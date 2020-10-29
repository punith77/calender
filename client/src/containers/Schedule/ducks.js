import axios from "axios";
import _ from "lodash";

const GET_APPOINTMENTS = "GET_PATIENTS";

const initialState = {};

// reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return _.mapKeys(action.payload, "_id");
    default:
      return state;
  }
}

// actions

export function getAppointments(date) {
  return (dispatch) => {
    axios.get(`/appointments?date=${date}`).then((res) =>
      dispatch({
        type: GET_APPOINTMENTS,
        payload: res.data,
      })
    );
  };
}
export function deleteAppointment(id, callback) {
  return (dispatch) => {
    axios
      .delete(`/appointments/deleteAppointment?appointmentId=${id}`)
      .then(() => callback());
  };
}
