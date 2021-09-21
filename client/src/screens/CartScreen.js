import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
  Image,
  Container,
} from "react-bootstrap";
import { addItemsToCart, removeItem } from "../features/cart/cartSlice";
import BackButton from "../components/BackButton";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = Number(new URLSearchParams(location.search).get("qty"));

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(
        addItemsToCart({
          productId,
          qty,
        })
      );
    }
    // history.push("/cart");
  }, [dispatch, productId, qty, history]);

  const checkOut = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Container className="mt-4">
      <BackButton history={history} />
      <Row>
        <Col md={8}>
          <h1 className="my-4">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>Your cart is empty</Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>

                    <Col md={2}>
                      <Form.Control
                        className="form-select"
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addItemsToCart({
                              productId: item.product,
                              qty: Number(e.target.value),
                            })
                          );
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((key) => (
                          <option key={key + 1}>{key + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        onClick={() => {
                          dispatch(removeItem(cartItems.indexOf(item)));
                        }}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  Subtotal ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  ) items{" "}
                </h3>
                ${" "}
                {cartItems
                  .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item className="d-grid gap-2">
                <Button
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={checkOut}
                >
                  CheckOut
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
