import React, { FC } from "react";
import { Row, Button } from "antd";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useSession } from "@supabase/auth-helpers-react";

interface AuthenticationProps {
  supabaseClient: SupabaseClient;
  children?: React.ReactNode;
}

const Authentication: FC<AuthenticationProps> = (props) => {
  const { supabaseClient, children } = props;
  const session = useSession();
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
