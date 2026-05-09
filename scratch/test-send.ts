import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { sendEmail } from '../lib/email';

async function main() {
  console.log('Attempting to send test email to mti.yazid@gmail.com...');
  
  const result = await sendEmail({
    to: 'mti.yazid@gmail.com',
    subject: 'Welcome to Revvview',
    template: 'welcome',
    variables: {
      first_name: 'Yazid',
    },
  });

  if (result.success) {
    console.log('✅ Success! Email sent.');
    console.log('Data:', result.data);
  } else {
    console.error('❌ Failed to send email.');
    console.error('Error:', result.error);
    console.log('\nNOTE: Please ensure you have added a valid RESEND_API_KEY to your .env.local file.');
  }
}

main();
