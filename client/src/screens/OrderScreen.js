import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { getOrders } from "../features/orderItems/ordersSlice";

import { resetCart } from "../features/cart/cartSlice";
import Orders from "../features/orderItems/Orders";

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders(orderId));
    if (orderDetails?.isPaid) {
      dispatch(resetCart());
    }
  }, [orderId, dispatch, orderDetails?.isPaid]);

  return (
    <Container className="my-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Orders orderDetails={orderDetails} orderId={orderId} error={error} />
      )}
    </Container>
  );
};

export default OrderScreen;
