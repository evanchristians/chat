import { useRouter } from "next/router";
import React from "react";
import RegisterForm from "../components/RegisterForm";
import { useMeQuery } from "../generated/types.d";

const Index: React.FC = () => {
  const { data } = useMeQuery();
  const router = useRouter();

  if (data?.me?.user) {
    router.push("/chat");
  }
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default Index;
