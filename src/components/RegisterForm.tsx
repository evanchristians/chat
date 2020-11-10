import { Box, Button, Flex, Link, Text } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/types.d";
import { InputField } from "./InputField";
import NextLink from "next/link";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Required"),
  });

  const [register] = useRegisterMutation({});
  return (
    <Box
      bg="gray.100"
      p={8}
      w={400}
      borderRadius={4}
      boxShadow="0 2px 2px #0f0f0f04"
    >
      <Text fontSize={24} mb={6}>
        Register
      </Text>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async ({ username, password }, { setFieldError }) => {
          const { data } = await register({
            variables: {
              username,
              password,
            },
            update: (cache, response) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: { user: response.data?.register.user },
                },
              });
            },
          });

          if (data?.register.errors) {
            data?.register.errors.forEach((error) =>
              setFieldError(error.field, error.message)
            );
          }
          if (data?.register.user) {
            router.push("/chat");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="Username" name="username" />
            <InputField label="Password" name="password" type="password" />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <Text textAlign="center" my={6}>
              Already have an account?{" "}
              <NextLink href="/login">
                <Link color="green.500">Login</Link>
              </NextLink>
            </Text>
            <Flex justifyContent="center">
              <Button bg="gray.300" type="submit" isLoading={isSubmitting}>
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
