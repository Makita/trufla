import React, { PureComponent } from 'react';

import { Pager } from 'react-bootstrap';

interface PaginationProps {
  page: number,
  handlePageChange: (page) => void
}

export default class Pagination extends PureComponent<PaginationProps, {}> {
  render() {
    const { page, handlePageChange } = this.props;
    const prevPage = page - 1;
    const nextPage = page + 1;

    return (
      <Pager>
        <Pager.Item previous disabled={prevPage <= 0} onClick={() => handlePageChange(prevPage)}>
          &larr; Previous Page
        </Pager.Item>
        <Pager.Item next onClick={() => handlePageChange(nextPage)}>
          Next Page &rarr;
        </Pager.Item>
      </Pager>
    );
  }
}