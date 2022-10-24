import { SupabaseClient } from "@supabase/auth-helpers-react";

export const signOut = async (supabaseClient: SupabaseClient) => {
    const { error } = await supabaseClient.auth.signOut();
  };
export default signOut;