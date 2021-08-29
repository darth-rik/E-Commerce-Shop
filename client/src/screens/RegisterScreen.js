import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { userRegister } from "../features/userAuth/userAuthSlice";
import FormContainer from "../components/FormContainer";

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const { loading, error, userInfo } = useSelector((state) => state.userAuth);

	const redirect = location.search
		? Number(new URLSearchParams(location.search).get("qty"))
		: "/";

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [userInfo, history, redirect]);

	const submit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Passwords do not match!");
		} else {
			dispatch(userRegister({ name, email, password }));
		}
	};
	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{error && <Message variant='danger'> {error}</Message>}
			{message && <Message variant='danger'> {message}</Message>}
			{loading ? (
				<Loader />
			) : (
				<>
					{" "}
					<Form onSubmit={submit}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								required
								type='name'
								placeholder='Enter Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								required
								type='email'
								placeholder='Enter Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password </Form.Label>
							<Form.Control
								required
								type='password'
								placeholder='Enter Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='confirmPassword'>
							<Form.Label>Confirm Password </Form.Label>
							<Form.Control
								required
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button className='my-3' type='submit' variant='primary'>
							Sign In
						</Button>
					</Form>
					<Row className='py-3'>
						<Col>
							Have an Account?{" "}
							<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
								Login
							</Link>
						</Col>
					</Row>{" "}
				</>
			)}
		</FormContainer>
	);
};

export default RegisterScreen;
