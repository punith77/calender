import axios from "axios";
import _ from "lodash";

const GET_PATIENTS = "GET_PATIENTS";

const initialState = {};

// reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS:
      return _.mapKeys(action.payload, "_id");
    default:
      return state;
  }
}

// actions

export function getPatients() {
  return (dispatch) => {
    axios.get("/patients").then((res) =>
      dispatch({
        type: GET_PATIENTS,
        payload: res.data,
      })
    );
  };
}
export function deletePatient(id, callback) {
  return (dispatch) => {
    axios.delete(`/patients/${id}/profile`).then(() => callback());
  };
}
