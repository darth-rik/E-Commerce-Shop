import React from "react";

import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../../components/Rating";

const ProductDetails = ({ product }) => {
	return (
		<Row>
			<Col md={6}>
				<Image src={product.image} fluid />
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
					<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
					<ListGroup.Item>Description: {product.description}</ListGroup.Item>
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
						<ListGroup.Item className='d-grid gap-2'>
							<Button type='button' disabled={product.countInStock === 0}>
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
