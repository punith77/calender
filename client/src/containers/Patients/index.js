import React, { Component } from "react";
import { connect } from "react-redux";
import { getPatients, deletePatient } from "./ducks";
import PropTypes from "prop-types";
import _ from "lodash";

class Patients extends Component {
  deletePatient(id) {
    this.props.deletePatient(id, () => {
      this.props.getPatients();
    });
  }

  componentDidMount() {
    this.props.getPatients();
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 id="patientListTitle">Patient List</h1>
        <div key="patients" className="patientsList">
          {this.props.patients
            ? _.map(this.props.patients, patient => {
                return (
                  <div key={patient._id} className="patient">
                    <div className="patientItem">
                      <div
                        onClick={() => history.push(`/patient/${patient._id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <h3>
                          {patient.firstName},{patient.lastName}
                        </h3>

                        <p style={{ fontSize: "20px" }}>
                          Birth Date:
                          {patient.dateOfBirth}{" "}
                        </p>
                      </div>
                      <div>
                        <button>
                          <i
                            onClick={this.deletePatient.bind(this, patient._id)}
                            style={{ color: "#EBEBEB", fontSize: "20px" }}
                            className="fas fa-trash"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  patients: state.getPatients
});

Patients.propTypes = {
  getPatients: PropTypes.func.isRequired,
  patients: PropTypes.object
};

export default connect(
  mapStateToProps,
  { getPatients, deletePatient }
)(Patients);
