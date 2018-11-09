import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { editPatient } from "./ducks";
import _ from "lodash";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: {}
    };
  }
  componentDidMount() {
    const profileInfo = this.props.location.state.profileState;
    this.setState({ profileInfo: profileInfo });
  }
  renderField(field) {
    return (
      <div className="formElement">
        <div>
          <div>
            <label>{field.label}:</label>
          </div>
          <input
            type="text"
            {...field.input}
            placeholder={field.placeholder}
            style={{ width: "60%" }}
          />
        </div>
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }
  onSubmit(values) {
    const id = this.state.profileInfo._id;
    this.props.editPatient(id, values, () => {
      this.props.history.push("/patients");
    });
  }
  render() {
    const profileInfo = this.state.profileInfo;
    const { handleSubmit, history } = this.props;
    if (!_.isEmpty(profileInfo)) {
      return (
        <div className="newPatient">
          <h1>Edit Patient</h1>
          <div className="newPatientForm">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name="firstName"
                component={this.renderField}
                label="First Name"
              />
              <Field
                name="lastName"
                component={this.renderField}
                label="Last Name"
              />
              <Field
                name="dateOfBirth"
                component={this.renderField}
                placeholder="yyyy-mm-dd"
                label="Date Of Birth"
              />

              <button className="btn btn-primary" type="submit">
                Save
              </button>
              <button
                onClick={() => history.push("/patients")}
                className="btn btn-danger"
                style={{ marginLeft: "10px" }}
              >
                cancel
              </button>
            </form>
          </div>
        </div>
      );
    } else return null;
  }
}

function validate(values) {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Enter the First Name";
  }
  if (!values.lastName) {
    errors.lastName = "Enter the Last Name";
  }
  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Enter the Date of Birth";
  }
  return errors;
}

export default reduxForm({
  validate: validate,
  initialValues: {
    firstName: "",
    lastName: "",
    dateOfBirth: ""
  },
  form: "PatientEditForm" // a unique identifier for this form
})(
  connect(
    null,
    { editPatient }
  )(EditProfile)
);
