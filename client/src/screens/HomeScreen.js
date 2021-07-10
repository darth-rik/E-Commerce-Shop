import React, { useEffect } from "react";

import ProductList from "../features/products/ProductList";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts } from "../features/products/productListSlice";

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
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<ProductList products={products} />
			)}
		</>
	);
};

export default HomeScreen;
