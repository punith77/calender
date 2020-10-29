import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-secondary'>
          <NavLink className='navbar-brand' to='/'>
            Payne DDS
          </NavLink>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item '>
                <NavLink
                  className='nav-link'
                  activeStyle={{ color: "#F97924" }}
                  to='/'
                  exact={true}
                >
                  Schedule
                </NavLink>
              </li>

              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  activeStyle={{ color: "#F97924" }}
                  to='/patients'
                >
                  All Patients
                </NavLink>
              </li>

              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  activeStyle={{ color: "#F97924" }}
                  to='/new'
                >
                  New Patients
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
