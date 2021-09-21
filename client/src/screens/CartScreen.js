import React from "react";

import { Container } from "react-bootstrap";

import BackButton from "../components/BackButton";
import Cart from "../features/cart/Cart";

const CartScreen = ({ history }) => {
  return (
    <Container className="mt-4">
      <BackButton history={history} />
      <Cart history={history} />
    </Container>
  );
};

export default CartScreen;
