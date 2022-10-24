import { SupabaseClient } from "@supabase/auth-helpers-react";

export const signIn = async (supabaseClient: SupabaseClient) => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
};

export default signIn;