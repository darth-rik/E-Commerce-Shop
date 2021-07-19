import React, { useState } from "react";

import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import Rating from "../../components/Rating";

const ProductDetails = ({ product, history, id }) => {
	const [qty, setQty] = useState(0);

	const addToCart = () => {
		history.push(`/cart/${id}?qty=${qty}`);
	};
	return (
		<Row>
			<Col md={6}>
				<Image src={product.image} fluid thumbnail={true} />
			</Col>
			<Col md={3}>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						<h3>{product.name}</h3>
					</ListGroup.Item>
					<ListGroup.Item>
						<Rating
							value={product.rating}
							text={`${product.numReviews} reviews`}
						/>
					</ListGroup.Item>
					<ListGroup.Item as='h4'> ${product.price}</ListGroup.Item>
					<ListGroup.Item> {product.description}</ListGroup.Item>
				</ListGroup>
			</Col>
			<Col md={3}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<Row>
								<Col>Price:</Col>
								<Col>
									<strong>${product.price}</strong>
								</Col>
							</Row>
						</ListGroup.Item>
					</ListGroup>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<Row>
								<Col>Status:</Col>
								<Col>
									{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
								</Col>
							</Row>
						</ListGroup.Item>

						{product.countInStock > 0 && (
							<ListGroup.Item>
								<Row>
									<Col>Qty:</Col>
									<Col>
										<Form.Control
											className='form-select'
											as='select'
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
						)}
						<ListGroup.Item className='d-grid gap-2'>
							<Button
								onClick={addToCart}
								type='button'
								disabled={product.countInStock === 0}
							>
								Add To Cart
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default ProductDetails;
