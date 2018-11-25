/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';

import ProductTable from 'Components/ProductTable/product-table';

import style from './app.scss';

export default class App extends Component {
  state = {
    page: 1
  }

  render() {
    const { page } = this.state;

    return (
      <div className={style.container}>
        <ProductTable page={page} />
      </div>
    );
  }
}