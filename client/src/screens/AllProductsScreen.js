import React, { useEffect, useState } from "react";
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

const AllProductsScreen = ({ location, match, history }) => {
  const dispatch = useDispatch();
  const searchedValue = match.params.value || "";

  const categoryName = match.params.category;
  const page = match.params.pageNumber;

  const categories = [
    "all",
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  const [value, setValue] = useState("");

  useEffect(() => {
    categoryName &&
      dispatch(
        getProducts({ category: categoryName, value: searchedValue, page })
      );
  }, [dispatch, categoryName, searchedValue, page]);

  const {
    products: { products, pages },
    loading,
    error,
  } = useSelector((state) => state.productList);

  if (!categoryName || !categories.includes(categoryName)) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="mt-4">
      <h1>Products Overview</h1>

      <Row>
        <Col md="6" lg="8">
          <ul className="product-category">
            {categories.map((category, index) => (
              <Link key={index} to={`/products/category/${category}/page/1`}>
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
          <InputGroup size="sm">
            <FormControl
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search..."
            />

            <Button
              onClick={() => {
                value &&
                  history.push(
                    `/products/category/${categoryName}/page/1/search/${value}`
                  );
                setValue("");
              }}
            >
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ProductList
          products={products}
          page={page}
          pages={pages}
          category={categoryName}
          value={searchedValue}
        />
      )}
    </Container>
  );
};

export default AllProductsScreen;
