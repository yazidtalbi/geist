import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SAAS_URLS = [
  'https://stripe.com',
  'https://linear.app',
  'https://framer.com',
  'https://vercel.com',
  'https://raycast.com',
  'https://cal.com',
  'https://resend.com',
  'https://supabase.com',
  'https://clerk.com',
  'https://convex.dev',
  'https://planetscale.com',
  'https://posthog.com',
  'https://metalab.com',
  'https://ueno.co',
  'https://work.co',
  'https://instrument.com'
];

const UX_CRITIQUES = {
  usability: [
    "The navigation is buttery smooth, but some secondary actions are buried too deep.",
    "Excellent keyboard shortcut support, though discoverability could be improved for new users.",
    "The layout is clean, but the information density is a bit high for mobile users.",
    "Very intuitive onboarding flow. The progressive disclosure of features is well-handled.",
    "Input fields lack clear error states, leading to minor friction during form submission."
  ],
  performance: [
    "Blazingly fast. The optimistic UI updates make the application feel instantaneous.",
    "Impressive load times. The edge caching strategy is clearly working well.",
    "Slight lag during heavy data filtering, but overall very responsive.",
    "The initial bundle size seems optimized, but large assets could be lazy-loaded better.",
    "Buttery smooth animations that don't compromise on thread performance."
  ],
  value: [
    "High value for scaling teams. The automation features alone justify the premium price.",
    "Great free tier, but the jump to the pro plan is quite steep for small projects.",
    "A must-have for developer productivity. Saves hours of manual configuration.",
    "Competitive pricing considering the depth of features provided.",
    "Solid ROI for design-driven companies looking to streamline their workflow."
  ],
  trust: [
    "Transparent security practices and excellent documentation build high confidence.",
    "The brand aesthetic communicates reliability and professional polish.",
    "Consistent uptime and clear status reporting make it a dependable choice.",
    "Well-established reputation in the industry. The community support is a big plus.",
    "Clear privacy policy and easy data export options reinforce user trust."
  ]
};

async function seed() {
  console.log('🌱 Starting seeding...');

  // 0. Clean DB
  console.log('🧹 Cleaning database...');
  const { error: delReviewsError } = await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: delProductsError } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: delNotifsError } = await supabase.from('notifications').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  if (delReviewsError || delProductsError || delNotifsError) {
    console.warn('Note: Some deletions might have failed due to RLS or constraints, continuing...');
  }

  // 1. Create Users
  console.log('👤 Creating 20 users...');
  const users = [];
  for (let i = 0; i < 20; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const role = faker.helpers.arrayElement(['Product Designer', 'Frontend Engineer', 'SaaS Founder', 'UX Researcher', 'Design Lead']);
    
    // Unsplash Portrait with grayscale transformation
    const avatar = `https://images.unsplash.com/photo-${faker.helpers.arrayElement([
      '1507003211169-0a1dd7228f2d', '1500648767791-00dcc994a43e', '1544005313-94ddf0286df2',
      '1438761681033-6461ffad8d80', '1472099645785-5658abf4ff4e', '1506794778202-cad84cf45f1d',
      '1534528741775-53994a69daeb', '1531746020798-e6953c6e8e04', '1527980972134-d538a5b5a56b',
      '1552058544-1e808064463b'
    ])}?auto=format&fit=crop&w=150&h=150&q=80&sat=-100`;

    users.push({
      id: faker.string.uuid(),
      name,
      avatar,
      role,
      reputation: faker.number.int({ min: 100, max: 5000 }),
      badges: faker.helpers.arrayElements(['Expert', 'Hunter', 'Critic', 'Pioneer'], { min: 1, max: 3 }),
      revvvviews_count: 0
    });
  }

  const { data: insertedUsers, error: userError } = await supabase.from('profiles').upsert(users).select();
  if (userError) {
    console.error('Error seeding users:', userError);
    return;
  }
  console.log('✅ Users seeded');

  // 2. Create Products using Microlink
  console.log('🌐 Fetching product metadata via Microlink...');
  const products = [];
  for (const url of SAAS_URLS) {
    try {
      const response = await axios.get(`https://api.microlink.io?url=${url}&screenshot=true&meta=true`);
      const { data } = response.data;

      let cleanName = data.title || url.replace('https://', '').split('.')[0];
      // Clean up title (remove everything after special characters like :, |, –, —)
      cleanName = cleanName.split(/[:|–—]/)[0].trim();
      // Cap title at 10 characters
      cleanName = cleanName.slice(0, 10).trim();

      products.push({
        name: cleanName,
        url: data.url,
        tagline: (data.description || "").slice(0, 60).trim() + (data.description && data.description.length > 60 ? "..." : ""),
        long_description: data.description,
        logo: data.logo?.url || '',
        screenshot: data.screenshot?.url || '',
        category: faker.helpers.arrayElement(['SAAS', 'DEV TOOL', 'DESIGN', 'AGENCY', 'UTILITY']),
        tags: faker.helpers.arrayElements(['Productivity', 'Workflow', 'Modern', 'Sleek'], 3),
        creator_id: faker.helpers.arrayElement(insertedUsers).id,
        revv_score: 0, // Will be calculated
        metrics_usability: faker.number.float({ min: 7, max: 10, fractionDigits: 1 }),
        metrics_performance: faker.number.float({ min: 7, max: 10, fractionDigits: 1 }),
        metrics_value: faker.number.float({ min: 7, max: 10, fractionDigits: 1 }),
        metrics_trust: faker.number.float({ min: 7, max: 10, fractionDigits: 1 }),
        active_users: faker.number.int({ min: 10, max: 100 }),
        reviews_total: 0,
        socials_twitter: url.replace('https://', '').split('.')[0],
        socials_website: url,
        awards: [
          { name: 'Product of the Day', emoji: '🏆' },
          { name: 'Best UI', emoji: '✨' }
        ],
        created_at: faker.date.between({ from: '2026-05-01T00:00:00.000Z', to: new Date() }).toISOString()
      });
      console.log(`Fetched: ${url}`);
    } catch (e) {
      console.error(`Failed to fetch metadata for ${url}:`, e);
    }
  }

  const { data: insertedProducts, error: productError } = await supabase.from('products').upsert(products).select();
  if (productError) {
    console.error('Error seeding products:', productError);
    return;
  }
  console.log('✅ Products seeded');

  // 3. Create Reviews
  console.log('📝 Creating reviews...');
  const reviews = [];
  for (const product of insertedProducts) {
    const numReviews = faker.number.int({ min: 3, max: 8 });
    for (let i = 0; i < numReviews; i++) {
      const metrics = {
        usability: faker.number.float({ min: 4, max: 10, fractionDigits: 1 }),
        performance: faker.number.float({ min: 4, max: 10, fractionDigits: 1 }),
        value: faker.number.float({ min: 4, max: 10, fractionDigits: 1 }),
        trust: faker.number.float({ min: 4, max: 10, fractionDigits: 1 })
      };

      reviews.push({
        auditor_id: faker.helpers.arrayElement(insertedUsers).id,
        product_id: product.id,
        version: `v${faker.system.semver()}`,
        metrics_usability: metrics.usability,
        metrics_performance: metrics.performance,
        metrics_value: metrics.value,
        metrics_trust: metrics.trust,
        feedback_usability: faker.helpers.arrayElement(UX_CRITIQUES.usability),
        feedback_performance: faker.helpers.arrayElement(UX_CRITIQUES.performance),
        feedback_value: faker.helpers.arrayElement(UX_CRITIQUES.value),
        feedback_trust: faker.helpers.arrayElement(UX_CRITIQUES.trust),
        first_impression: faker.lorem.sentence(),
        engaged: [faker.lorem.words(3), faker.lorem.words(3)],
        confused: [faker.lorem.words(3)],
        would_use: faker.datatype.boolean(),
        suggestions: [
          "Add multi-select filtering to roadmap|The current roadmap view lacks granular filtering capabilities, making it increasingly difficult for stakeholders to isolate specific project milestones or filter by strategic priority. This leads to information overload and significantly slows down the decision-making process for larger product dossiers.|Critical|High",
          "Streamline onboarding checkout flow|Users are dropping off at the payment stage due to excessive form fields and lack of progress indicators, leading to a 15% lower conversion rate than industry benchmarks.|High|Critical",
          "Implement real-time collaboration indicators|The absence of presence indicators causes versioning conflicts when multiple team members edit the same dossier simultaneously, resulting in data loss and user frustration.|Medium|High"
        ],
        strategic_outlook: faker.lorem.paragraph(),
        time_spent: faker.number.int({ min: 300, max: 1800 }),
        created_at: faker.date.between({ from: '2026-05-01T00:00:00.000Z', to: new Date() }).toISOString()
      });
    }
  }

  const { error: reviewError } = await supabase.from('reviews').insert(reviews);
  if (reviewError) {
    console.error('Error seeding reviews:', reviewError);
    return;
  }
  console.log('✅ Reviews seeded');

  // 4. Update Product Scores and Review Counts
  console.log('🔄 Updating product aggregates...');
  for (const product of insertedProducts) {
    const { data: productReviews } = await supabase.from('reviews').select('metrics_usability, metrics_performance, metrics_value, metrics_trust').eq('product_id', product.id);
    
    if (productReviews && productReviews.length > 0) {
      const avg = (key: keyof typeof productReviews[0]) => productReviews.reduce((acc, curr) => acc + (curr[key] as number), 0) / productReviews.length;
      
      const metrics_usability = avg('metrics_usability');
      const metrics_performance = avg('metrics_performance');
      const metrics_value = avg('metrics_value');
      const metrics_trust = avg('metrics_trust');
      const revv_score = (metrics_usability + metrics_performance + metrics_value + metrics_trust) / 4;

      await supabase.from('products').update({
        revv_score: Number(revv_score.toFixed(1)),
        metrics_usability: Number(metrics_usability.toFixed(1)),
        metrics_performance: Number(metrics_performance.toFixed(1)),
        metrics_value: Number(metrics_value.toFixed(1)),
        metrics_trust: Number(metrics_trust.toFixed(1)),
        reviews_total: productReviews.length
      }).eq('id', product.id);
    }
  }
  console.log('✅ Aggregates updated');

  // 5. Create Notifications
  console.log('🔔 Creating notifications...');
  const { data: allProfiles } = await supabase.from('profiles').select('id, name');
  const notifications = [];
  
  if (allProfiles) {
    for (const user of allProfiles) {
      const numNotifs = faker.number.int({ min: 2, max: 5 });
      for (let i = 0; i < numNotifs; i++) {
        const actor = faker.helpers.arrayElement(allProfiles.filter(u => u.id !== user.id) || [user]);
        const type = faker.helpers.arrayElement(['review', 'reputation', 'mention', 'system']);
        const product = faker.helpers.arrayElement(insertedProducts);
        
        let actionText = "";
        let entityId = null;

        switch (type) {
          case 'review': 
            actionText = `reviewed your latest product submission: ${product?.name}`; 
            entityId = product?.id;
            break;
          case 'reputation': actionText = `upvoted your audit on ${product?.name}`; break;
          case 'mention': actionText = `mentioned you in a deep-dive audit`; break;
          case 'system': actionText = `Your account has been upgraded to Elite Tier`; break;
        }

        notifications.push({
          user_id: user.id,
          actor_id: type === 'system' ? allProfiles[0].id : actor.id,
          type,
          action_text: actionText,
          entity_id: entityId,
          is_read: faker.datatype.boolean(0.3),
          created_at: faker.date.recent({ days: 7 }).toISOString()
        });
      }
    }

    const { error: notifError } = await supabase.from('notifications').insert(notifications);
    if (notifError) {
      console.warn('⚠️ Notifications insert failed:', notifError.message);
    } else {
      console.log('✅ Notifications seeded');
    }
  }

  console.log('🎉 Seeding complete!');
}

seed();
