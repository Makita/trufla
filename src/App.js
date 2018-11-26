/* eslint-disable no-invalid-this, import/no-unresolved */
import React, { Component } from 'react';

import Filters from 'Components/Filters/filters';
import ProductTable from 'Components/ProductTable/product-table';
import Pagination from 'Components/Pagination/pagination';

import style from './app.scss';

const productsPerPage = 20;

export default class App extends Component {
  state = {
    departmentFilter: null,
    page: Number(window.location.pathname.replace(/\D/gu, '')) || 1,
    products: [],
    promoCodeFilter: null,
    searchFilter: ""
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = () => {
    const {
      page,
      departmentFilter,
      promoCodeFilter,
      searchFilter
    } = this.state;
    const start = ((page - 1) * productsPerPage) + 1;
    const end = start + 20;

    const queryParams = [];

    if (departmentFilter !== null) queryParams.push(`department=${departmentFilter}`);
    if (promoCodeFilter !== null) queryParams.push(`promo_code=${promoCodeFilter}`)

    queryParams.push(`search=${searchFilter}`);

    fetch(`/products/${start}/${end}?${queryParams.join('&')}`)
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }

  handleDepartmentFilterChange = (event: Event) => {
    const src = event.target || event.src;
    const value = src.value === "" ? null : src.value

    this.setState({
      departmentFilter: value
    }, this.loadProducts);
  }

  handlePromoCodeChange = (event: Event) => {
    const src = event.target || event.src;
    const value = src.value === "" ? null : src.value

    this.setState({
      promoCodeFilter: value
    }, this.loadProducts)
  }

  handleSearchChange = (event: Event) => {
    const src = event.target || event.src;

    this.setState({
      searchFilter: src.value
    }, this.loadProducts)
  }

  handlePageChange = (page) => {
    window.history.pushState({}, "", `/${page}`);

    this.setState({
      page
    }, this.loadProducts)
  }

  render() {
    const { products, page } = this.state;

    return (
      <div className={style.container}>
        <Filters
          handleDepartmentFilterChange={this.handleDepartmentFilterChange}
          handlePromoCodeChange={this.handlePromoCodeChange}
          handleSearchChange={this.handleSearchChange}
        />
        <ProductTable productsPerPage={productsPerPage} products={products} />
        <Pagination page={page} handlePageChange={this.handlePageChange} />
      </div>
    );
  }
}