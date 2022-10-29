import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
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
        <Auth
          supabaseClient={supabaseClient}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "facebook"]}
        >
          <Component {...pageProps} />
        </Auth>
      )}
    </SessionContextProvider>
  );
}

export default MyApp;
