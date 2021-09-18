import React from "react";
import { Col, Row } from "react-bootstrap";
import Paginate from "../../components/Paginate";
import Product from "../../components/Product";

const ProductList = ({ products, page, pages, category, value }) => {
  return (
    <>
      <Row>
        {products?.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      {page && (
        <Paginate
          currentPage={page}
          pages={pages}
          category={category}
          value={value}
        />
      )}
    </>
  );
};

export default ProductList;
