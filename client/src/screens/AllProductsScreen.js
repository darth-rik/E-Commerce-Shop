import React, { useEffect } from "react";
import {
	Container,
	Row,
	Col,
	InputGroup,
	Button,
	FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductList from "../features/products/ProductList";
import { getProducts } from "../features/products/productListSlice";

const AllProductsScreen = ({ location }) => {
	const dispatch = useDispatch();

	const query = new URLSearchParams(location.search);
	const categoryName = query.get("category");
	const categories = [
		"all",
		"men's clothing",
		"women's clothing",
		"electronics",
		"jewelery",
	];

	useEffect(() => {
		dispatch(getProducts(categoryName));
	}, [dispatch, categoryName]);

	const { products, loading, error } = useSelector(
		(state) => state.productList
	);

	if (!categoryName || !categories.includes(categoryName)) {
		return <Redirect to='/' />;
	}

	return (
		<Container className='mt-4'>
			<h1>Products Overview</h1>

			<Row>
				<Col md='6' lg='8'>
					<ul className='product-category'>
						{categories.map((category, index) => (
							<Link key={index} to={`/products?category=${category}`}>
								<li
									className={
										categoryName === category ? "category-link-active" : ""
									}
								>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</li>
							</Link>
						))}
					</ul>
				</Col>
				<Col>
					<InputGroup size='sm'>
						<FormControl placeholder='Search...' />
						<Button>Search</Button>
					</InputGroup>
				</Col>
			</Row>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<ProductList products={products} />
			)}
		</Container>
	);
};

export default AllProductsScreen;
