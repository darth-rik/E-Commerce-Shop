import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { saveShippingAddress } from "../features/shipping/shippingAddressSlice";
import FormContainer from "../components/FormContainer";
import CheckoutBreadCrumb from "../components/CheckoutBreadCrumb";

const ShippingScreen = ({ history }) => {
	const { shippingAddress } = useSelector((state) => state.shipping);
	const dispatch = useDispatch();

	const [address, setAddress] = useState(shippingAddress.address || "");
	const [city, setCity] = useState(shippingAddress.city || "");
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode || ""
	);
	const [country, setCountry] = useState(shippingAddress.country || "");

	const submit = (e) => {
		e.preventDefault();

		dispatch(
			saveShippingAddress({
				address,
				city,
				postalCode,
				country,
			})
		);

		history.push("/payment");
	};

	return (
		<FormContainer>
			<CheckoutBreadCrumb step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submit}>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						required
						type='text'
						placeholder='Enter address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						required
						type='text'
						placeholder='Enter city'
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						required
						type='text'
						placeholder='Enter country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='postalCode'>
					<Form.Label>PostalCode</Form.Label>
					<Form.Control
						required
						type='text'
						placeholder='Enter Postal Code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
