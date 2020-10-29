import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPatient } from "./ducks";
import _ from "lodash";

class Profile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPatient(id);
  }
  render() {
    const { profileInfo } = this.props.patientInfo;
    if (!_.isEmpty(profileInfo)) {
      return (
        <div className='profile'>
          <div>
            <h4>
              {profileInfo.firstName}, {profileInfo.lastName}
            </h4>
            <p>Birth Date: {profileInfo.dateOfBirth}</p>
            <Link
              to={{
                pathname: "/appointments/new",
                state: {
                  profileState: profileInfo,
                },
              }}
            >
              Schedule Appointment
            </Link>
          </div>
          <Link
            to={{
              pathname: "/edit",
              state: {
                profileState: profileInfo,
              },
            }}
          >
            <i className='far fa-edit' />
          </Link>
        </div>
      );
    } else return null;
  }
}
function mapStateToProps(state) {
  return { patientInfo: state.patientProfile };
}
export default connect(mapStateToProps, { fetchPatient })(Profile);
