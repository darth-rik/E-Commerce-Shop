import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import Message from "../components/Message";

import FormContainer from "../components/FormContainer";
import Register from "../features/userAuth/Register";

const RegisterScreen = ({ location, history }) => {
  const { loading, error, userInfo } = useSelector((state) => state.userAuth);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant="danger"> {error}</Message>}
      <Register loading={loading} redirect={redirect} />
    </FormContainer>
  );
};

export default RegisterScreen;
