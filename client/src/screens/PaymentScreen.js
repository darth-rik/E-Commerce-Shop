import React, { useState } from "react";

import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { savePaymentMethod } from "../features/paymentMethod/paymentMethodSlice";
import FormContainer from "../components/FormContainer";
import CheckoutBreadCrumb from "../components/CheckoutBreadCrumb";

const PaymentScreen = ({ history }) => {
	const { shippingAddress } = useSelector((state) => state.shipping);
	const dispatch = useDispatch();

	if (!shippingAddress) {
		history.push("/shipping");
	}

	const [paymentMethod, setPaymentMethod] = useState("Stripe");

	const submit = (e) => {
		e.preventDefault();

		dispatch(savePaymentMethod(paymentMethod));

		history.push("/placeorder");
	};

	return (
		<FormContainer>
			<CheckoutBreadCrumb step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submit}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>

					<Col>
						<Form.Check
							type='radio'
							label='Credit Card'
							id='Stripe'
							name='paymentMethod'
							value='Stripe'
							checked
							onChange={(e) => {
								setPaymentMethod(e.target.value);
							}}
						></Form.Check>
						<Form.Check
							type='radio'
							label='Cash on Delivery'
							id='Cash'
							name='paymentMethod'
							value='Cash'
							onChange={(e) => {
								setPaymentMethod(e.target.value);
							}}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
