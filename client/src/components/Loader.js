import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
	return (
		<Spinner
			animation='grow'
			role='status'
			style={{
				display: "block",
				margin: " 25vh auto",
			}}
		>
			<span className='sr-only'> Loading...</span>
		</Spinner>
	);
};

export default Loader;
