import { useSessionContext } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import Authentication from "../components/Authentication";

const LoginPage: NextPage = () => {
  const supabaseClient = useSessionContext();
  return <Authentication supabaseClient={supabaseClient.supabaseClient} />;
};

export default LoginPage;
