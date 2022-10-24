import { SupabaseClient } from "@supabase/auth-helpers-react";

export const signIn = async (supabaseClient: SupabaseClient) => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
};

export const signInWithFacebook = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "facebook",
  });
};

export default {signIn, signInWithFacebook};