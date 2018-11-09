import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
// import Adapter from "enzyme-adapter-react-16";
import thunk from "redux-thunk";

import Patients from "./";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe("NewPatient page", () => {
  let component;
  const store = mockStore({
    getPatients: {
      patients: [
        {
          _id: "5bd62250d62cc34a29e93c47",
          firstName: "starLord",
          lastName: "One",
          dateOfBirth: "19910501",
          __v: 0
        }
      ]
    }
  });
  beforeEach(() => {
    const componentHtml = (
      <Provider store={store}>
        <Patients />
      </Provider>
    );
    component = mount(componentHtml);
  });
  it("renders the component", () => {
    expect(component.exists()).toBe(true);
  });
  it("shows the tiltle of the page", () => {
    expect(component.find("#patientListTitle").exists()).toBe(true);
  });
  it("shows the patients list", () => {
    expect(component.find(".patientsList").exists()).toBe(true);
  });
  it("Checks we have one patients", () => {
    expect(component.find(".patient").length).toEqual(1);
  });
});
