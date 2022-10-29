import React, { FC, useEffect } from "react";
import { Row, Button } from "antd";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

interface AuthenticationProps {
  supabaseClient: SupabaseClient;
  children?: React.ReactNode;
}

const Authentication: FC<AuthenticationProps> = ({
  supabaseClient,
  children,
}) => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  });
  if (!session) {
    return (
      <div style={{ padding: "5rem 5rem" }}>
        <Auth
          supabaseClient={supabaseClient}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "facebook"]}
        />
      </div>
    );
  }
  return <>{children}</>;
};

export default Authentication;
