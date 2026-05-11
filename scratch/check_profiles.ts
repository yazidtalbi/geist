import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, role')
    .eq('name', 'Yazid Talbi');

  if (error) {
    console.error(error);
    return;
  }

  console.log('Profiles found:', JSON.stringify(data, null, 2));
}

checkProfiles();
