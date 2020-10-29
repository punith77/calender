import axios from "axios";

export function submitAppointment(values, callback) {
  return (dispatch) => {
    axios
      .post("/appointments/addAppointment", values)
      .then((res) => callback(res))
      .catch((err) => callback(err));
  };
}
