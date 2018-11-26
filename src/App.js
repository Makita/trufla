/* eslint-disable no-invalid-this, import/no-unresolved */
import React, { Component } from 'react';

import Filters from 'Components/Filters/filters';
import ProductTable from 'Components/ProductTable/product-table';
import Pagination from 'Components/Pagination/pagination';

import style from './app.scss';

// This value is used for everything related to how many products are on a page
const productsPerPage = 20;

export default class App extends Component {
  state = {
    departmentFilter: null,
    page: Number(window.location.pathname.replace(/\D/gu, '')) || 1,
    products: [],
    promoCodeFilter: null,
    searchFilter: ""
  }

  /**
   * Perform an initial load so the page doesn't have nothing on it when first
   * visited.
   * @returns {void}
   */
  componentDidMount() {
    this.loadProducts();
  }

  /**
   * Updates the state to have all the products which will be displayed on the
   * page. Caching is not utilized.
   * @returns {void}
   */
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

  /**
   * When a select option is chosen from the Filters, this sets a state value.
   * @param {Event} event The Event object as passed to an onChange function.
   * @returns {void}
   */
  handleDepartmentFilterChange = (event: Event) => {
    const src = event.target || event.src;
    const value = src.value === "" ? null : src.value

    this.setState({
      departmentFilter: value
    }, this.loadProducts);
  }

  /**
   * When a select option is chosen from the Filters, this sets a state value.
   * @param {Event} event The Event object as passed to an onChange function.
   * @returns {void}
   */
  handlePromoCodeChange = (event: Event) => {
    const src = event.target || event.src;
    const value = src.value === "" ? null : src.value

    this.setState({
      promoCodeFilter: value
    }, this.loadProducts)
  }

  /**
   * When the user makes any text modifications to the field, this sets a state
   * value.
   * @param {Event} event The Event object as passed to an onChange function.
   * @returns {void}
   */
  handleSearchChange = (event: Event) => {
    const src = event.target || event.src;

    this.setState({
      searchFilter: src.value
    }, this.loadProducts)
  }

  /**
   * When the user clicks one of the pagination buttons at the bottom, this
   * sets the page in state.
   * @param {number} page The page number that we're changing to.
   * @returns {void}
   */
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