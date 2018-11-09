import axios from "axios";

export function editPatient(id, values, callback) {
  return dispatch => {
    axios.patch(`patients/${id}/profile`, values).then(res => callback());
  };
}
