import React from "react";
import LoginForm from "../components/LoginForm";
import { Text } from "@chakra-ui/core";

const Login: React.FC = () => {
  return (
    <>
      <Text fontSize={24} mb={6}>Login</Text>
      <LoginForm />
    </>
  );
};

export default Login;
