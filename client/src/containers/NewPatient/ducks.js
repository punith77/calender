import axios from "axios";

export function submitPatient(values, callback) {
  return (dispatch) => {
    axios.post("/patients/register", values).then(() => callback());
  };
}
