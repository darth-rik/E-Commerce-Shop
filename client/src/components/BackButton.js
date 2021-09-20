import React from "react";
import { Button } from "react-bootstrap";

const BackButton = ({ history }) => {
  return (
    <Button onClick={() => history.goBack()} className="btn btn-primary my-3">
      Go Back
    </Button>
  );
};

export default BackButton;
