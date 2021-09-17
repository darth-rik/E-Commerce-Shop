import React, { useEffect } from "react";

import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import CheckoutBreadCrumb from "../components/CheckoutBreadCrumb";
import { Link } from "react-router-dom";
import { createOrders } from "../features/orderItems/ordersSlice";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.shipping);
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cartItems } = useSelector((state) => state.cart);

  // Calculate Prices

  const itemsPrice = parseFloat(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  );
  const shippingPrice = itemsPrice > 50 ? 0 : 10;

  const taxPrice = parseFloat((0.1 * itemsPrice).toFixed(2));

  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const { success, error, orderItems } = useSelector((state) => state.orders);

  useEffect(() => {
    if (success) {
      history.push(`/order/${orderItems._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrder = () => {
    dispatch(
      createOrders({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice,
      })
    );
  };

  return (
    <Container className="my-5">
      <CheckoutBreadCrumb step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items </h2>
              {cartItems.length === 0 ? (
                <Message> Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col md={6}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={placeOrder}
                  type="button"
                  className="w-100"
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
