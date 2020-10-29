import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import { submitAppointment } from "./ducks";

class NewAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      profileInfo: {},
    };
  }
  componentDidMount() {
    const profileInfo = this.props.location.state.profileState;
    this.setState({ profileInfo: profileInfo });
  }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }
  handleDayClick(day) {
    this.setState({ selectedDay: day });
  }

  renderTimeField(field) {
    return (
      <div className='formElement'>
        <div>
          <div>
            <label>{field.label}:</label>
          </div>
          <input
            type='time'
            {...field.input}
            placeholder={field.placeholder}
            style={{ width: "60%" }}
            autoComplete='off'
          />
        </div>
        <div className='textHelp'>
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }
  renderDurationField(field) {
    return (
      <div className='formElement'>
        <div>
          <div>
            <label>{field.label}:</label>
          </div>
          <input
            type='number'
            {...field.input}
            style={{ width: "60%" }}
            min='1'
            max='1439'
            autoComplete='off'
          />
        </div>
        <div className='textHelp'>
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }
  renderDayField(field) {
    return (
      <div className='formElement'>
        <div>
          <div>
            <label>{field.label}:</label>
          </div>
          <input
            type='date'
            {...field.input}
            style={{ width: "60%" }}
            autoComplete='off'
          />
        </div>
        <div className='textHelp'>
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }

  renderRepeatField(field) {
    return (
      <div className='formElement'>
        <div className='checkbox'>
          <label style={{ paddingTop: "10px" }}>{field.label}</label>

          <input
            type='checkbox'
            {...field.input}
            style={{ width: "60%" }}
            autoComplete='off'
          />
        </div>

        <div className='textHelp'>
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }
  renderSelectField(field) {
    return (
      <div className='formElement'>
        <div>
          <div>
            <label>{field.label}:</label>
          </div>
          <select
            type='select'
            {...field.input}
            style={{ width: "60%" }}
            autoComplete='off'
          >
            <option value=''>How often</option>
            <option value='weekly'>Weekely</option>
          </select>
        </div>
        <div className='textHelp'>
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    values.firstName = this.state.profileInfo.firstName;
    values.lastName = this.state.profileInfo.lastName;
    values.id = this.state.profileInfo._id;
    console.log(values);
    this.props.submitAppointment(values, (res) => {
      if (_.some(res.data, ["isAdded", false])) {
        alert(
          "This appointment collides with other appointments on the same day"
        );
      } else {
        this.props.history.push("/");
      }
    });
  }

  render() {
    const { handleSubmit, history, hasRepeat } = this.props;
    return (
      <div className='newPatient'>
        <h1>Appointment</h1>

        <div className='newPatientForm'>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name='date' component={this.renderDayField} label='Date' />
            <Field name='time' component={this.renderTimeField} label='Time' />
            <Field
              name='duration'
              component={this.renderDurationField}
              label='Duration (minutes)'
            />
            <Field
              name='repeat'
              component={this.renderRepeatField}
              label='Repeat'
            />
            {hasRepeat && (
              <div>
                <Field
                  name='select'
                  component={this.renderSelectField}
                  label='How Often'
                />
                <Field
                  name='endDate'
                  component={this.renderDayField}
                  label='End Date'
                />
              </div>
            )}

            <button className='btn btn-primary' type='submit'>
              Save
            </button>
            <button
              id='newPatientBackButton'
              onClick={() => history.push("/")}
              className='btn btn-danger'
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
  if (!values.date) {
    errors.date = "Please select the date";
  }
  if (!values.time) {
    errors.time = "Enter the Time";
  }
  if (!values.duration) {
    errors.duration = "Enter the Duration";
  }
  return errors;
}
const mapStateToProps = (state) => ({
  patients: state.getPatients,
});

let NewAppointmentForm = reduxForm({
  validate: validate,
  initialValues: {
    date: moment().format("YYYY-MM-DD"),
    time: moment().format("HH:mm"),
    duration: "30",
    repeat: false,
  },
  form: "selectingFormValues", // a unique identifier for this form
})(NewAppointment);

const selector = formValueSelector("selectingFormValues"); // <-- same as form name
NewAppointmentForm = connect((state) => {
  const hasRepeat = selector(state, "repeat");

  return {
    hasRepeat,
  };
})(NewAppointmentForm);

export default connect(mapStateToProps, { submitAppointment })(
  NewAppointmentForm
);
