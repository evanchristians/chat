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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useField } from "formik";
import React, { InputHTMLAttributes, useState } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  isPassword?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: undefined,
  isPassword,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={!!(error && touched)}>
      <FormLabel fontWeight="300" htmlFor={field.name}>
        {label}
      </FormLabel>
      <InputGroup>
        <Input
          {...field}
          {...props}
          id={field.name}
          bg="gray.300"
          type={!isPassword || showPassword ? "text" : "password"}
        />
        <InputRightElement>
          {isPassword ? (
            showPassword ? (
              <ViewIcon
                color="_hoveredPurple"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <ViewOffIcon
                color="_hoveredPurple"
                onClick={() => setShowPassword(!showPassword)}
              />
            )
          ) : (
            <FormErrorIcon color="red.500"></FormErrorIcon>
          )}
        </InputRightElement>
      </InputGroup>
      <Flex justifyContent="center" height={10}>
        <FormErrorMessage fontSize={14}>{error}</FormErrorMessage>
      </Flex>
    </FormControl>
  );
};
