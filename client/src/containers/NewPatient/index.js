import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { submitPatient } from "./ducks";

class NewPatient extends Component {
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
    this.props.submitPatient(values, () => {
      this.props.history.push("/patients");
    });
  }

  render() {
    const { handleSubmit, history } = this.props;
    return (
      <div className="newPatient">
        <h1 id="newPatientTitle">New Patient</h1>
        <div className="newPatientForm">
          <form
            id="newPatientForm"
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
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

            <button
              id="newPatientSaveButton"
              className="btn btn-primary"
              type="submit"
            >
              Save
            </button>
            <button
              id="newPatientBackButton"
              onClick={() => history.push("/")}
              className="btn btn-danger"
              style={{ marginLeft: "10px" }}
            >
              cancel
            </button>
          </form>
        </div>
      </div>
    );
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
  form: "PatientNewForm" // a unique identifier for this form
})(
  connect(
    null,
    { submitPatient }
  )(NewPatient)
);
