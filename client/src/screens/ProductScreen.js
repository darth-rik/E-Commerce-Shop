import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetails } from "../features/products/productDetailsSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductDetails from "../features/products/ProductDetails";
import { Container } from "react-bootstrap";

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const { loading, error, product, success, errorReview } = useSelector(
    (state) => state.productDetails
  );

  const { userInfo } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match, success]);

  return (
    <Container>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ProductDetails
          id={match.params.id}
          history={history}
          product={product}
          success={success}
          userInfo={userInfo}
          error={errorReview}
        />
      )}
    </Container>
  );
};

export default ProductScreen;
