import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, currentPage, category, value }) => {
  return (
    <Pagination>
      {[...Array(pages).keys()].map((page) => (
        <LinkContainer
          key={page + 1}
          to={
            value
              ? `/products/category/${category}/page/${
                  page + 1
                }/search/${value}`
              : `/products/category/${category}/page/${page + 1}`
          }
        >
          <Pagination.Item active={page + 1 === currentPage}>
            {page + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};

export default Paginate;
