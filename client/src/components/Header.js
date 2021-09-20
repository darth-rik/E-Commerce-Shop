import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../features/userAuth/userAuthSlice";
import { useHistory } from "react-router";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userAuth);

  const logout = () => {
    dispatch(userLogout());
    history.push("/");
  };
  return (
    <header>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        sticky="top"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand> E-Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav style={{ marginLeft: "auto" }}>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"> </i>{" "}
                  <Badge className="badge-notify">{cartItems.length}</Badge>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={`Hello, ${userInfo.name
                    .split(" ")
                    .slice(0, 1)
                    .join()}`}
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logout}> Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
