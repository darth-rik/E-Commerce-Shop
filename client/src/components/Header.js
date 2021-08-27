import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
	const { cartItems } = useSelector((state) => state.cart);
	return (
		<header>
			<Navbar
				bg='light'
				variant='light'
				expand='lg'
				sticky='top'
				collapseOnSelect
			>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand> E-Shop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav style={{ marginLeft: "auto" }}>
							<LinkContainer to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'> </i>{" "}
									<Badge className='badge-notify'>{cartItems.length}</Badge>
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/login'>
								<Nav.Link>
									<i className='fas fa-user'></i> Login
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
