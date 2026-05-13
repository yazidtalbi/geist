import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listTables() {
  const { data, error } = await supabase.rpc('get_tables'); // This might not work if the RPC doesn't exist
  
  if (error) {
    // Fallback: try to select from information_schema
    const { data: tables, error: tablesError } = await supabase.from('pg_catalog.pg_tables').select('tablename').eq('schemaname', 'public');
    if (tablesError) {
      console.error('Error listing tables:', tablesError);
      return;
    }
    console.log('Tables:', tables.map(t => t.tablename));
  } else {
    console.log('Tables:', data);
  }
}

listTables();
