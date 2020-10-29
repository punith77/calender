import axios from "axios";

const FETCH_PATIENT = "FETCH_PATIENT";

export function fetchPatient(id) {
  return (dispatch) => {
    axios.get(`/patients/${id}/profile`).then((res) =>
      dispatch({
        type: FETCH_PATIENT,
        payload: res.data,
      })
    );
  };
}

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PATIENT:
      return { ...state, profileInfo: action.payload };
    default:
      return state;
  }
}
