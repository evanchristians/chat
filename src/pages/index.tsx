import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Text } from "@chakra-ui/core";

const Index: React.FC = () => {
  return (
    <>
      <Text fontSize={24} mb={6}>Register</Text>
      <RegisterForm />
    </>
  );
};

export default Index;
