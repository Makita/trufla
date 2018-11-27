/* eslint-disable no-undef */
import * as React from 'react';
import Filters, { SelectOptions } from './filters';

describe("SelectOptions", () => {
  it("creates three elements given an object with 3 properties", () => {
    const data = [
      { id: 1, name: "One" },
      { id: 2, name: "Two" },
      { id: 3, name: "Three" }
    ];

    const wrapper = mount(<SelectOptions data={data} />);

    expect(wrapper.children().length).toBe(data.length);
  });
})

describe("Filters", () => {
  it("should render correctly", () => {
    fetch
      .once(JSON.stringify([{ id: 1, name: "Department 1" }]))
      .once(JSON.stringify([{ id: 2, code: "Promo Code 1", discount: 100.0 }]));

    const wrapper = shallow(<Filters />)

    expect(wrapper).toMatchSnapshot();
  })
})