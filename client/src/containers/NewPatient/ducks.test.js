import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";
import { CREATE_PATIENT, submitPatient } from "./ducks";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

const patient = {
  firstName: "test",
  lastName: "punith",
  dateOfBirth: "19910501"
};
describe("NewPatient Actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it("should fire the correct action when setContacts is called", () => {
    nock("/")
      .post("patients/register", patient)
      .reply(200, "success");

    function callback() {
      return "something";
    }

    store.dispatch(submitPatient(patient, callback));
    expect(store.getActions()[store.getActions().length - 1]).toBe(
      CREATE_PATIENT
    );
  });
});
