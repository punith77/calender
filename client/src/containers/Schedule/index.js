import React, { Component } from "react";
import moment from "moment-timezone";
import _ from "lodash";
import { connect } from "react-redux";
import { getAppointments, deleteAppointment } from "./ducks";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment()
    };
    this.goToPreviousDay = this.goToPreviousDay.bind(this);
    this.goToNextDay = this.goToNextDay.bind(this);
  }
  componentDidMount() {
    const searchDate = this.state.date.format("YYYY-MM-DD");
    this.props.getAppointments(searchDate);
  }
  goToNextDay() {
    this.setState({ date: moment(this.state.date).add(1, "day") });
    const searchDate = moment(this.state.date)
      .add(1, "day")
      .format("YYYY-MM-DD");
    this.props.getAppointments(searchDate);
  }
  goToPreviousDay() {
    this.setState({ date: moment(this.state.date).subtract(1, "day") });
    const searchDate = moment(this.state.date)
      .subtract(1, "day")
      .format("YYYY-MM-DD");
    this.props.getAppointments(searchDate);
  }
  delAppointment(id) {
    this.props.deleteAppointment(id, () => {
      const searchDate = this.state.date.format("YYYY-MM-DD");
      this.props.getAppointments(searchDate);
    });
  }

  render() {
    return (
      <div>
        <div className="schedule">
          <div className="scheduleLeft">
            <h1 style={{ color: "#fff" }}>
              {this.state.date.format("MMMM Do, YYYY")}
            </h1>

            <p style={{ color: "#fff" }}>
              {" "}
              You have no appointments scheduled{" "}
            </p>
          </div>
          <div className="scheduleRight">
            <button className="arrow" onClick={this.goToPreviousDay}>
              <i className="fas fa-angle-left" style={{ color: "#fff" }} />
            </button>
            <i className="fas fa-calendar-alt" style={{ color: "#fff" }} />
            <button className="arrow" onClick={this.goToNextDay}>
              <i className="fas fa-angle-right" style={{ color: "#fff" }} />
            </button>
          </div>
        </div>
        {this.props.appointments
          ? _.map(this.props.appointments, appointment => {
              return (
                <div key={appointment._id} className="appointmentList">
                  <div>
                    {appointment.startTime} - {appointment.endTime}{" "}
                  </div>
                  <div>
                    {appointment.firstName} , {appointment.lastName}
                  </div>
                  <div>
                    <button
                      onClick={this.delAppointment.bind(this, appointment._id)}
                    >
                      <i
                        style={{ color: "#EBEBEB" }}
                        className="fas fa-trash"
                      />
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appointments: state.getAppointments
});
export default connect(
  mapStateToProps,
  { getAppointments, deleteAppointment }
)(Schedule);
