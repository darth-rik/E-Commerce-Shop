import React, { useEffect } from "react";

import ProductList from "../features/products/ProductList";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getTopProducts } from "../features/products/productListSlice";
import Carousel from "../components/Carousel";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const { loading, error, topProducts } = useSelector(
    (state) => state.productList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  return (
    <>
      <Carousel />
      <Container>
        <h1 className="mb-3">Trending this Week</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <ProductList products={topProducts} />
        )}
        <Link className="my-4" to="/products/category/all/page/1">
          <Button size="lg" variant="outline-secondary">
            See More Products
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default HomeScreen;
