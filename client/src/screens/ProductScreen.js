import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetails } from "../features/products/productDetailsSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductDetails from "../features/products/ProductDetails";

const ProductScreen = ({ match }) => {
	const dispatch = useDispatch();

	const { loading, error, product } = useSelector(
		(state) => state.productDetails
	);

	useEffect(() => {
		dispatch(getProductDetails(match.params.id));
	}, [dispatch, match]);

	return (
		<>
			<Link className='btn btn-dark my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<ProductDetails product={product} />
			)}
		</>
	);
};

export default ProductScreen;
