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
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { getOrders } from "../features/orderItems/ordersSlice";

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!orderDetails) dispatch(getOrders(orderId));
  }, [orderId, dispatch, orderDetails]);

  return (
    <Container className="my-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1 className="mb-5">Order {orderDetails?._id}</h1>

          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    {" "}
                    <strong> Name: </strong>
                    {orderDetails?.user.name}
                  </p>
                  <p>
                    {" "}
                    <strong> Email: </strong>
                    <a href={`mailto: ${orderDetails?.user.email}`}>
                      {orderDetails?.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {orderDetails?.shippingAddress.address},{" "}
                    {orderDetails?.shippingAddress.city},{" "}
                    {orderDetails?.shippingAddress.postalCode},{" "}
                    {orderDetails?.shippingAddress.country}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {orderDetails?.paymentMethod}
                  </p>
                  {orderDetails?.isPaid ? (
                    <Message variant="success">
                      {" "}
                      Paid on {orderDetails?.paidAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items </h2>
                  {orderDetails?.orderItems.length === 0 ? (
                    <Message> Your cart is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {orderDetails?.orderItems.map((item, index) => (
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
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
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
                      <Col>${orderDetails?.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${orderDetails?.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${orderDetails?.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && <Message variant="danger">{error}</Message>}
                  </ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default OrderScreen;
