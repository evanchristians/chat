import { Box, Button, Flex, Text, Link } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/types.d";
import { InputField } from "./InputField";
import NextLink from "next/link";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string().required("Password is required"),
  });

  const [login] = useLoginMutation({});
  return (
    <Box
      bg="gray.100"
      p={8}
      w={400}
      borderRadius={12}
      boxShadow="0 2px 2px #0f0f0f04"
    >
      <Text fontWeight="900" fontSize={32} mb={6} color="_purple">
        Login
      </Text>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async ({ username, password }, { setFieldError }) => {
          const { data } = await login({
            variables: {
              username,
              password,
            },
            update: (cache, response) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: { user: response.data?.login.user },
                },
              });
            },
          });

          if (data?.login.errors) {
            data?.login.errors.forEach((error) =>
              setFieldError(error.field, error.message)
            );
          }
          if (data?.login.user) {
            router.push("/chat");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="Username" name="username" />
            <InputField label="Password" name="password" isPassword/>
            <Text fontWeight="300" textAlign="center" my={6}>
              Don't have an account?{" "}
              <NextLink href="/">
                <Link fontWeight="500" color="_purple">
                  Register
                </Link>
              </NextLink>
            </Text>
            <Flex justifyContent="center">
              <Button
                bg="_purple"
                color="white"
                type="submit"
                isLoading={isSubmitting}
                fontWeight="500"
                _hover={{
                  background: "_hoveredPurple",
                }}
              >
                Login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
