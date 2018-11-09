import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import App from "./App";

import Navbar from "./containers/Navbar";
let wrapped;
beforeEach(() => {
  wrapped = shallow(<App />);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("shows the navbar component", () => {
  expect(wrapped.find(Navbar).length).toEqual(1);
});
