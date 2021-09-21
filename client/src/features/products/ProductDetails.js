import React, { useEffect, useState } from "react";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Rating from "../../components/Rating";
import { createProductReview } from "./productDetailsSlice";
import { addItemsToCart } from "../cart/cartSlice";

const ProductDetails = ({ product, id, userInfo, success, error }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [itemAdded, setItemAdded] = useState(false);

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment("");
    }
  }, [success]);

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addToCart = () => {
    dispatch(
      addItemsToCart({
        productId: id,
        qty: 1,
      })
    );
    setItemAdded(true);
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview({
        id,
        review: {
          rating,
          comment,
        },
      })
    );
  };
  return (
    <>
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid thumbnail={true} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item as="h4"> ${product.price}</ListGroup.Item>
            <ListGroup.Item> {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control
                        className="form-select"
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((key) => (
                          <option key={key + 1}>{key + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )} */}
              <ListGroup.Item className="d-grid gap-2">
                {cartItems.some((item) => item.product === id) ? (
                  <Link to="/cart">
                    {" "}
                    <Button className="w-100" type="button">
                      Go to Cart
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={addToCart}
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                )}
              </ListGroup.Item>
              {itemAdded && (
                <ListGroup.Item>
                  <Message variant="success">Item added to cart!</Message>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews?.length === 0 && <Message>No reviews</Message>}
          <ListGroup variant="flush">
            {product.reviews?.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="mt-4">
              <h2>Write a customer review</h2>
              {error && <Message variant="danger">{error}</Message>}
              {userInfo ? (
                <Form onSubmit={submit}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      className="form-select"
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 -Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button className="mt-3" type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login"> Login </Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
