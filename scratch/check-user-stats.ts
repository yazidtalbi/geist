import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    console.error('Error fetching profiles:', error);
    return;
  }

  console.log(`Total users: ${data.length}`);
  if (data.length > 0) {
    console.log('Columns:', Object.keys(data[0]));
    
    // Check if gender column exists
    if ('gender' in data[0]) {
      const females = data.filter(u => u.gender?.toLowerCase() === 'female').length;
      const males = data.filter(u => u.gender?.toLowerCase() === 'male').length;
      console.log(`Females: ${females}`);
      console.log(`Males: ${males}`);
    } else {
      console.log('No gender column found in profiles table.');
    }
  }
}

checkUsers();
