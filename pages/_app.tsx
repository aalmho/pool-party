import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Authentication from "../components/Authentication";
import { useRouter } from "next/router";
import MenuHeader from "../components/MenuHeader";

const publicPages = ["/", "/party/[id]"];

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const isPublicPage = publicPages.includes(router.pathname);

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <MenuHeader supabaseClient={supabaseClient} />
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <Authentication supabaseClient={supabaseClient}>
          <Component {...pageProps} />
        </Authentication>
      )}
    </SessionContextProvider>
  );
}

export default MyApp;
