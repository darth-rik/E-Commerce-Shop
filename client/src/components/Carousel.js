import React from "react";
import { Carousel, ListGroup, Button, Image } from "react-bootstrap";
import Men from "../images/mens_ad.jpg";
import Women from "../images/women's_ad.jpg";
import Elec from "../images/electronics_ad.jpg";

const ProductCarousel = () => {
	return (
		<Carousel variant='dark' indicators={false} className='mb-5'>
			<Carousel.Item>
				<Image fluid src={Men} alt='' />
				<Carousel.Caption>
					<ListGroup variant='flush'>
						<ListGroup.Item as='h2'>Men's Collection</ListGroup.Item>
						<ListGroup.Item className='text-muted' style={{}} as='h1'>
							{" "}
							New Arrivals
						</ListGroup.Item>{" "}
						<ListGroup.Item as='span'>
							<Button size='lg'>Shop Now</Button>
						</ListGroup.Item>
					</ListGroup>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img src={Women} alt='' />
				<Carousel.Caption as='div'>
					<ListGroup variant='flush'>
						<ListGroup.Item as='h2'>Women's Collection</ListGroup.Item>
						<ListGroup.Item className='text-muted' style={{}} as='h1'>
							{" "}
							New Season
						</ListGroup.Item>{" "}
						<ListGroup.Item as='span'>
							<Button size='lg'>Shop Now</Button>
						</ListGroup.Item>
					</ListGroup>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img src={Elec} alt='' />
				<Carousel.Caption as='div'>
					<ListGroup variant='flush'>
						<ListGroup.Item as='h2'>Electronics</ListGroup.Item>
						<ListGroup.Item className='text-muted' style={{}} as='h1'>
							{" "}
							Exciting Offers
						</ListGroup.Item>{" "}
						<ListGroup.Item as='span'>
							<Button size='lg'>Shop Now</Button>
						</ListGroup.Item>
					</ListGroup>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};

export default ProductCarousel;
