import type { NextPage } from "next";
import Authentication from "../components/Authentication";
import { supabase } from "../utils/supabaseClient";

const LoginPage: NextPage = () => {
  return (
    <>
      <Authentication supabaseClient={supabase} />
    </>
  );
};

export default LoginPage;
