/* eslint-disable no-magic-numbers */
// @flow
import React, { PureComponent } from 'react';

import { Table } from 'react-bootstrap';

const ProductRow = ({
  id,
  name,
  price,
  department,
  promoCode,
  discount
}: {
  id: number,
  name: string,
  price: number,
  department: Object,
  promoCode: Object,
  discount: number
}) => {
  const discounted = price * (1 - (discount / 100));
  let priceLine = <td>{price.toFixed(2)}</td>;

  if (discount !== 0) priceLine = <td><s>{price.toFixed(2)}</s> {discounted.toFixed(2)}</td>

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      {priceLine}
      <td>{department}</td>
      <td>{promoCode}</td>
    </tr>
  )
}

const ProductRows = ({ products, productsPerPage }) => {
  if (products.length === 0 || typeof products.data === "object") {
    return Array.from(Array(productsPerPage).fill().keys()).map((key) => {
      return (
        <tr key={`missing${key}`}>
          <td>#</td>
          <td>Loading</td>
          <td>Loading</td>
          <td>Loading</td>
          <td>Loading</td>
        </tr>
      );
    });
  }

  return products.map((product) => {
    const code = product.code === "nopromo" ? "" : product.code;

    return <ProductRow
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      department={product.dept_name}
      promoCode={code}
      discount={product.discount}
    />;
  });
}

export default class ProductTable extends PureComponent {
  render() {
    return (
      <Table striped responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Department</th>
            <th>Promo Code</th>
          </tr>
        </thead>
        <tbody>
          <ProductRows {...this.props} />
        </tbody>
      </Table>
    );
  }
}