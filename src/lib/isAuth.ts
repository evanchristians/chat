import { useMeQuery } from "../generated/types.d";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const isAuth = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace("/login");
    }
  }, [loading, data, router]);

  if (data?.me) {
    return {
      me: data.me,
    };
  }
};
