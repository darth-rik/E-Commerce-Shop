import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "./userAuthSlice";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

const Login = ({ redirect }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();

    dispatch(userLogin({ email, password }));
  };
  return (
    <>
      {" "}
      <Form onSubmit={submit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="my-3" type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>{" "}
    </>
  );
};

export default Login;
