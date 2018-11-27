/* eslint-disable no-undef */
import * as React from 'react';
import ProductTable, { ProductRow, ProductRows } from './product-table';

describe('ProductRow', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <ProductRow
        id="1"
        name="Epic Product"
        price={1.00}
        dept_name="Marketing"
        code="nopromo"
        discount={50.0}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe('ProductRows', () => {
  it('should render correctly with no data', () => {
    const wrapper = shallow(<ProductRows products={[]} />);

    expect(wrapper).toMatchSnapshot();
  })

  it('should render correctly with data', () => {
    const products = [{
      id: 1,
      name: "Epic Product",
      price: 1.00,
      dept_name: "Marketing",
      code: "nopromo",
      discount: 50.0
    }];

    const wrapper = shallow(<ProductRows products={products} />)

    expect(wrapper).toMatchSnapshot();
  });
});

describe('ProductTable', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ProductTable />)

    expect(wrapper).toMatchSnapshot();
  });
})