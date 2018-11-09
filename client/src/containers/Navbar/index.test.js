import React from "react";
import { mount } from "enzyme";
import Navbar from "./";
import { StaticRouter } from "react-router";

describe("Navbar Component", () => {
  let wrapped;
  beforeEach(() => {
    wrapped = mount(
      <StaticRouter>
        <Navbar />
      </StaticRouter>
    );
  });
  afterEach(() => {
    wrapped.unmount();
  });
  it("has Nav bar items", () => {
    expect(wrapped.find("li").length).toEqual(3);
  });
  it("shows the tiltle of the page", () => {
    expect(wrapped.find(".navbar-brand").exists()).toBe(true);
  });
});
