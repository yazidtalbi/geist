import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role to update profiles
);

async function recalculateXP() {
  console.log('Fetching all profiles and reviews...');
  
  // Fetch all profiles
  const { data: profiles, error: pError } = await supabase.from('profiles').select('id, name');
  if (pError) throw pError;

  // Fetch all reviews
  const { data: reviews, error: rError } = await supabase.from('reviews').select('*');
  if (rError) throw rError;

  console.log(`Found ${profiles.length} profiles and ${reviews.length} reviews.`);

  for (const profile of profiles) {
    const userReviews = reviews.filter(r => r.auditor_id === profile.id);
    
    let totalXP = 0;
    for (const r of userReviews) {
      const score = (r.metrics_usability || 0) + 
                    (r.metrics_performance || 0) + 
                    (r.metrics_value || 0) + 
                    (r.metrics_trust || 0);
      totalXP += Math.floor(score * 125);
    }

    // Update profile reputation and reviews count
    const { error: uError } = await supabase
      .from('profiles')
      .update({ 
        reputation: totalXP,
        revvvviews_count: userReviews.length
      })
      .eq('id', profile.id);

    if (uError) {
      console.error(`Error updating profile ${profile.name}:`, uError);
    } else {
      console.log(`Updated ${profile.name}: ${totalXP} XP (${userReviews.length} reviews)`);
    }
  }

  console.log('Recalculation complete.');
}

recalculateXP();
