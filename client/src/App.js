import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import AllProductsScreen from "./screens/AllProductsScreen";

const App = () => {
	return (
		<Router>
			<Header />
			<main>
				<Route exact path='/' component={HomeScreen} />
				<Route exact path='/products' component={AllProductsScreen} />
				<Route path='/product/:id' component={ProductScreen} />
			</main>
			<Footer />
		</Router>
	);
};

export default App;
