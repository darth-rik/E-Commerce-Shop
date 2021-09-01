import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
	getUserDetails,
	updateUserDetails,
} from "../features/userAuth/userAuthSlice";

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const { userInfo, loading, error, user, success } = useSelector(
		(state) => state.userAuth
	);

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!user.name) {
				dispatch(getUserDetails("profile"));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [userInfo, history, dispatch, user]);

	const submit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Passwords do not match!");
		} else {
			dispatch(
				updateUserDetails({
					id: user._id,
					name,
					email,
					password,
				})
			);
			setMessage(null);
		}
	};
	return (
		<Container className='my-5'>
			<Row>
				<Col md={3}>
					<h2>User Profile</h2>
					{error && <Message variant='danger'> {error}</Message>}
					{message && <Message variant='danger'> {message}</Message>}
					{success && <Message variant='success'> Profile Updated</Message>}
					{loading ? (
						<Loader />
					) : (
						<Form onSubmit={submit}>
							<Form.Group controlId='name'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='name'
									placeholder='Enter Name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='email'>
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='password'>
								<Form.Label>Password </Form.Label>
								<Form.Control
									type='password'
									placeholder='Enter Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='confirmPassword'>
								<Form.Label>Confirm Password </Form.Label>
								<Form.Control
									type='password'
									placeholder='Confirm Password'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Button className='my-3' type='submit' variant='primary'>
								Update
							</Button>
						</Form>
					)}
				</Col>
				<Col md={9}>
					<h2>My orders</h2>
				</Col>
			</Row>
		</Container>
	);
};

export default ProfileScreen;
