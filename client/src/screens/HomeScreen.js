import React, { useEffect } from "react";

import ProductList from "../features/products/ProductList";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts } from "../features/products/productListSlice";
import CarouselEffect from "../components/Carousel";
import {
	Button,
	Col,
	Container,
	FormControl,
	InputGroup,
	ListGroup,
	ListGroupItem,
	Row,
} from "react-bootstrap";

const HomeScreen = () => {
	const { loading, error, products } = useSelector(
		(state) => state.productList
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadProducts());
	}, [dispatch]);

	return (
		<>
			<CarouselEffect />
			<Container>
				<h1 className='mb-3'>Trending this Week</h1>
				{/* <Row>
					<Col md='6' lg='8'>
						<ul className='product-category'>
							<li>All Products</li>
							<li>Men's Clothing</li>
							<li>Women's Cloth</li>
							<li>Electronics</li>
							<li>Jewellery</li>
						</ul>
					</Col>
					<Col>
						<InputGroup size='sm'>
							<FormControl placeholder='Search...' />
							<Button>Search</Button>
						</InputGroup>
					</Col>
				</Row> */}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<ProductList products={products} />
				)}
			</Container>
		</>
	);
};

export default HomeScreen;
