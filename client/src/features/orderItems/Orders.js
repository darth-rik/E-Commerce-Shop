import React from "react";

import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

import axios from "axios";
import store from "../../store";
import { getUpdatedOrder } from "./ordersSlice";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { useDispatch } from "react-redux";

const Orders = ({ orderDetails, orderId, error }) => {
  const dispatch = useDispatch();

  const makePayment = async () => {
    if (orderDetails?.paymentMethod === "Stripe") {
      const {
        userAuth: { userInfo },
      } = store.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/payments/checkout-session/${orderDetails._id}`,
        config
      );

      if (data.success) {
        window.location.href = `${data.session.url}`;
      }
    } else {
      dispatch(getUpdatedOrder(orderId));
    }
  };
  return (
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
                  <Col>Shipping</Col>
                  <Col>${orderDetails?.shippingPrice}</Col>
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

              <ListGroup.Item>
                <Button
                  disabled={orderDetails?.isPaid}
                  onClick={makePayment}
                  className="btn-block w-100"
                >
                  Make Payment
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Orders;
