/* eslint-disable no-magic-numbers */
// @flow
import React, { PureComponent } from 'react';

import { Table } from 'react-bootstrap';

/**
 * Represents a single product as a row in the products table.
 * @param {number} id The ID of the product.
 * @param {string} name The product name.
 * @param {number} price A float representing the price of this product.
 * @param {Object} department An object representing the department this product belongs to.
 * @param {Object} promoCode An object representing the promo code this product this product
 * belongs to.
 * @param {number} discount A float representing how much of a percent discount is active.
 * @returns {JSX.ELement} A row in the products table.
 */
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

/**
 * Represents all the rows of products in the products table.
 * @param {Object} products The products that will be displayed on the current page.
 * @param {number} productsPerPage The amount of products displayed on each page. Used to calculate
 * how many elements are made in the event of an empty products param.
 * @returns {Array<JSX.Element>} The product rows.
 */
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

interface ProductTableProps {
  products: Object,
  productsPerPage: number
}

/**
 * The products table. Provides the styling and headers.
 */
export default class ProductTable extends PureComponent<ProductTableProps, {}> {
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