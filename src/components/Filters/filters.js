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

export default class Filters extends Component<FiltersProps, FiltersState> {
  state = {
    departments: {},
    promoCodes: {}
  }

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