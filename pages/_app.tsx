import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Authentication from "../components/Authentication";
import { useRouter } from "next/router";
import Navigation from "../components/Navigation";
import styled from "styled-components";

const publicPages = ["/", "/party/[id]"];
const Wrapper = styled.div`
  height: 100vh;
  background: radial-gradient(
      circle at 1% 15%,
      rgba(255, 0, 0, 0.3),
      rgba(255, 0, 0, 0) 30.71%
    ),
    radial-gradient(
      circle at 6.7% 95%,
      rgba(0, 0, 255, 0.3),
      rgba(0, 0, 255, 0) 20.71%
    ),
    radial-gradient(
        circle at 93.3% 75%,
        rgba(0, 255, 0, 0.3),
        rgba(0, 255, 0, 0) 20.71%
      )
      #fbfcfa;
`;

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const isPublicPage = publicPages.includes(router.pathname);
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Navigation supabaseClient={supabaseClient} />
      <Wrapper>
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <Authentication supabaseClient={supabaseClient}>
            <Component {...pageProps} />
          </Authentication>
        )}
      </Wrapper>
    </SessionContextProvider>
  );
}

export default MyApp;
