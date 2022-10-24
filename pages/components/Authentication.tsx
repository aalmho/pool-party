import React, { FC } from "react";
import { Row, Button } from "antd";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { SupabaseClient } from "@supabase/supabase-js";
import signIn from "../../utils/singIn";
import { useSession } from "@supabase/auth-helpers-react";

interface AuthenticationProps {
  supabaseClient: SupabaseClient;
  children: React.ReactNode;
}

const Authentication: FC<AuthenticationProps> = (props) => {
  const { supabaseClient, children } = props;
  const session = useSession();
  if (!session) {
    return (
      <div style={{ padding: "5rem 20rem" }}>
        <Row justify="center">
          <Button onClick={() => signIn(supabaseClient)}>
            Sign in with google
          </Button>
        </Row>

        <Auth
          supabaseClient={supabaseClient}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
        />
      </div>
    );
  }
  return <>{children}</>;
};

export default Authentication;
