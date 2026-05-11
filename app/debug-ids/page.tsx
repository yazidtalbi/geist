import { createClient } from '@/app/lib/supabase-server';

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();

  return (
    <pre>
      User ID: {user?.id}
      Profile ID: {profile?.id}
      Equality: {user?.id === profile?.id ? "MATCH" : "MISMATCH"}
    </pre>
  );
}
