import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addNotifications() {
  console.log('🔔 Fetching all users...');
  const { data: profiles, error: profileError } = await supabase.from('profiles').select('id, name');
  
  if (profileError || !profiles) {
    console.error('Error fetching profiles:', profileError);
    return;
  }

  console.log(`👤 Found ${profiles.length} users. Adding test notifications...`);

  const { data: products } = await supabase.from('products').select('id, name');
  const notifications = [];
  const types = ['review', 'reputation', 'mention', 'system'];

  for (const user of profiles) {
    // Add 5 fresh notifications for each user
    for (let i = 0; i < 5; i++) {
      const actor = faker.helpers.arrayElement(profiles.filter(p => p.id !== user.id) || [user]);
      const type = faker.helpers.arrayElement(types);
      const product = faker.helpers.arrayElement(products || []);
      
      let actionText = "";
      let entityId = null;

      switch (type) {
        case 'review': 
          actionText = `reviewed your latest product submission: ${product?.name}`; 
          entityId = product?.id;
          break;
        case 'reputation': 
          actionText = `upvoted your audit on ${product?.name || "a trending SaaS"}`; 
          break;
        case 'mention': 
          actionText = `mentioned you in a deep-dive audit`; 
          break;
        case 'system': 
          actionText = `Your account has been upgraded to Elite Tier`; 
          break;
      }

      notifications.push({
        user_id: user.id,
        actor_id: type === 'system' ? profiles[0].id : actor.id,
        type,
        action_text: actionText,
        entity_id: entityId,
        is_read: false,
        created_at: new Date(Date.now() - i * 3600000).toISOString()
      });
    }
  }

  const { error: notifError } = await supabase.from('notifications').insert(notifications);
  
  if (notifError) {
    console.error('Error inserting notifications:', notifError);
  } else {
    console.log('✅ Successfully added test notifications to all accounts!');
    console.log('🚀 Go refresh your browser to see the results.');
  }
}

addNotifications();
