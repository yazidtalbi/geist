import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function countGenders() {
  const { data, error } = await supabase
    .from('profiles')
    .select('avatar');

  if (error) {
    console.error(error);
    return;
  }

  const femaleIds = ['1544005313-94ddf0286df2', '1438761681033-6461ffad8d80', '1534528741775-53994a69daeb', '1531746020798-e6953c6e8e04'];
  const maleIds = ['1507003211169-0a1dd7228f2d', '1500648767791-00dcc994a43e', '1472099645785-5658abf4ff4e', '1506794778202-cad84cf45f1d', '1527980972134-d538a5b5a56b', '1552058544-1e808064463b'];

  let females = 0;
  let males = 0;
  let unknown = 0;

  for (const p of data) {
    const avatar = p.avatar || '';
    if (femaleIds.some(id => avatar.includes(id))) {
      females++;
    } else if (maleIds.some(id => avatar.includes(id))) {
      males++;
    } else {
      unknown++;
    }
  }

  console.log(`Total: ${data.length}`);
  console.log(`Females (based on seeded avatars): ${females}`);
  console.log(`Males (based on seeded avatars): ${males}`);
  console.log(`Unknown: ${unknown}`);
}

countGenders();
