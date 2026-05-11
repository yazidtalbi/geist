import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase-server";
import { slugify } from "@/app/lib/utils";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // Fetch profile to get the name for slug
  const { data: profile } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', user.id)
    .single();

  const name = profile?.name || user.user_metadata?.full_name || "User";
  const slug = slugify(name);

  redirect(`/profile/${slug}`);
}
