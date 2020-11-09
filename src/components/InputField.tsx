import {
  Flex,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/core";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: undefined,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  return (
    <FormControl isInvalid={!!(error && touched)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        <Input {...field} {...props} id={field.name} bg="gray.300" />
        <InputRightElement>
          <FormErrorIcon color="red.500"></FormErrorIcon>
        </InputRightElement>
      </InputGroup>
      <Flex justifyContent="center" mb={6}>
        <FormErrorMessage fontSize={14}>{error}</FormErrorMessage>
      </Flex>
    </FormControl>
  );
};
