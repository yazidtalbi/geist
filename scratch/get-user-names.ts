import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function getNames() {
  const { data, error } = await supabase
    .from('profiles')
    .select('name');

  if (error) {
    console.error(error);
    return;
  }

  console.log(JSON.stringify(data.map(d => d.name)));
}

getNames();
