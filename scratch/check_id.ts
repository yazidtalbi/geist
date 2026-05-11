import { createClient } from './app/lib/supabase-server';

async function check() {
  const supabase = await createClient();
  const { data } = await supabase.from('profiles').select('id, name').limit(1);
  console.log(JSON.stringify(data, null, 2));
}

check();
