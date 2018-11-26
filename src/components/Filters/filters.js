/* eslint-disable no-invalid-this */
import React, { Component } from 'react';

import {
  ControlLabel,
  FormControl,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import style from './filters.scss';

/**
 * Creates an option tag for each element in the data passed.
 * @param {Object} data The data we'll iterate over to generate the option tags.
 * @returns {Array<JSX.Element>} An array of option tags in JSX.
 */
const SelectOptions = ({ data }) => {
  return Array.from(data).map((item) => {
    // eslint-disable-next-line array-element-newline
    return <option key={item.id} value={item.id}>{item.name || item.code}</option>;
  })
};

interface FiltersProps {
  handleDepartmentFilterChange: (Event) => void
}

interface FiltersState {
  departments: Object,
  promoCodes: Object
}

/**
 * Generates all the elements at the top that handle filtering of product entries.
 */
export default class Filters extends Component<FiltersProps, FiltersState> {
  state = {
    departments: {},
    promoCodes: {}
  }

  /**
   * These values never change so we only need to query for them the first time.
   * @returns {void}
   */
  componentDidMount() {
    fetch('/departments')
      .then(res => res.json())
      .then(departments => this.setState({ departments }));

    fetch('/promo_codes')
      .then(res => res.json())
      .then(promoCodes => this.setState({ promoCodes }));
  }

  render() {
    const { departments, promoCodes } = this.state;
    const {
      handleDepartmentFilterChange,
      handlePromoCodeChange,
      handleSearchChange
    } = this.props;

    return (
      <div className={style.container}>
        <Grid>
          <Row>
            <Col md={2}>
              <ControlLabel>Department</ControlLabel>
            </Col>
            <Col md={2}>
              <FormControl componentClass="select" placeholder="" onChange={handleDepartmentFilterChange}>
                <option value="">Unfiltered</option>
                <SelectOptions data={departments} />
              </FormControl>
            </Col>
            <Col md={2}>
              <ControlLabel>Promo Code</ControlLabel>
            </Col>
            <Col md={2}>
              <FormControl componentClass="select" placeholder="" onChange={handlePromoCodeChange}>
                <option value="">Unfiltered</option>
                <SelectOptions data={promoCodes} />
              </FormControl>
            </Col>
            <Col md={2}>
              <ControlLabel>Item Search</ControlLabel>
            </Col>
            <Col md={2}>
              <FormControl
                type="text"
                placeholder="Enter an item name to search for."
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}