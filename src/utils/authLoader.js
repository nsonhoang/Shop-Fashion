import { supabase } from "@/lib/supabase";
import { redirect } from "react-router-dom";

export const adminLoader = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return redirect("/");

  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role_id")
    .eq("user_id", session.user.id)
    .single();

  if (!userRole || userRole.role_id !== 1) {
    return redirect("/");
  }
  return null;
};
