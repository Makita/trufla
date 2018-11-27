/* eslint-disable no-undef */
import * as React from 'react';
import Pagination from './pagination';

describe("Pagination", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<Pagination />);

    expect(wrapper).toMatchSnapshot();
  })
});