import { useRouter } from "next/router";
import React from "react";
import LoginForm from "../components/LoginForm";
import { useMeQuery } from "../generated/types.d";

const Login: React.FC = () => {
  const { data } = useMeQuery();
  const router = useRouter();

  if (data?.me?.user) {
    router.push("/chat");
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
