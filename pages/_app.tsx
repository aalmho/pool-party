import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Authentication from "./components/Authentication";
import { Button } from "antd";
import signOut from "../utils/signOut";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Authentication supabaseClient={supabaseClient}>
        <Button onClick={() => signOut(supabaseClient)}>Log out</Button>
        <Component {...pageProps} />
      </Authentication>
    </SessionContextProvider>
  );
}

export default MyApp;
