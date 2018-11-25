/* eslint-disable no-magic-numbers */
// @flow
import React, { Component } from 'react';

import { Table } from 'react-bootstrap';

const productsPerPage = 20;

const ProductRow = ({
  id,
  name,
  price,
  department,
  promoCode
}: {
  id: number,
  name: string,
  price: number,
  department: Object,
  promoCode: Object
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{department}</td>
      <td>{promoCode}</td>
    </tr>
  )
}

const ProductRows = ({ products, page }) => {
  const keys = Array.from(
    Array(productsPerPage).keys(),
    // eslint-disable-next-line id-length
    x => x + (productsPerPage * (page - 1)) + 1
  );

  return keys.map((key) => {
    const product = products[key];

    if (typeof product === "undefined" || typeof product["promo-code"] === "undefined") return null;

    const code = product["promo-code"].code === "nopromo" ? "" : product["promo-code"].code;

    return <ProductRow
      id={product.id}
      name={product.name}
      price={product.price}
      department={product.department.name}
      promoCode={code}
    />;
  });
}

export default class ProductTable extends Component<{ page: number }, {}> {
  state = {
    products: {},
  }

  componentDidMount() {
    fetch('/products/1/21')
      .then(res => res.json())
      .then(json => this.handleJSON(json.data));
  }

  handleJSON(data) {
    // Take each product and add it to an object structured like the state
    const newValues = data.reduce((accumulator, value) => {
      return {
        ...accumulator,
        [value.id]: value.attributes
      };
    }, {})

    // eslint-disable-next-line no-unused-vars
    this.setState({
      products: newValues
    });
  }

  render() {
    const { products } = this.state;
    const { page } = this.props;

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
          <ProductRows products={products} page={page} />
        </tbody>
      </Table>
    );
  }
}