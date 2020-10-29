import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
// import Adapter from "enzyme-adapter-react-16";
import thunk from "redux-thunk";

import NewPatient from "./";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe("NewPatient page", () => {
  let component;
  const store = mockStore({
    form: {
      PatientNewForm: {},
    },
  });
  beforeEach(() => {
    const componentHtml = (
      <Provider store={store}>
        <NewPatient />
      </Provider>
    );
    component = mount(componentHtml);
  });
  it("renders the component", () => {
    expect(component.exists()).toBe(true);
  });
  it("has input fields and a button", () => {
    expect(component.find("input").length).toEqual(3);
    expect(component.find("button").length).toEqual(2);
  });
  it("shows the tiltle of the page", () => {
    expect(component.find("#newPatientTitle").exists()).toBe(true);
  });
  it("shows the form", () => {
    expect(component.find("#newPatientForm").exists()).toBe(true);
  });
  it("shows the save button", () => {
    expect(component.find("#newPatientSaveButton").exists()).toBe(true);
  });
  it("shows the back button", () => {
    expect(component.find("#newPatientBackButton").exists()).toBe(true);
  });

  it("fires the correct action on submit", () => {
    component.find("form").at(0).simulate("submit");
    expect(store.getActions()[store.getActions().length - 1].type).toBe(
      "@@redux-form/SET_SUBMIT_SUCCEEDED"
    );
  });
});
