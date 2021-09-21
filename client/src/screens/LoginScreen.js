import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import FormContainer from "../components/FormContainer";
import Login from "../features/userAuth/Login";

const LoginScreen = ({ location, history }) => {
  const { loading, error, userInfo } = useSelector((state) => state.userAuth);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant="danger"> {error}</Message>}
      {loading ? <Loader /> : <Login redirect={redirect} />}
    </FormContainer>
  );
};

export default LoginScreen;
