import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase-server";
import { getInitials } from "@/app/lib/data";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // Fetch profile to get the name for initials
  const { data: profile } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', user.id)
    .single();

  const name = profile?.name || user.user_metadata?.full_name || "User";
  const initials = getInitials(name);

  redirect(`/profile/${initials}`);
}
