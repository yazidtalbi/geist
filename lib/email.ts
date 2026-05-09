import fs from 'fs';
import path from 'path';
import { resend } from './resend';

export type EmailTemplate = 'welcome' | 'submission_success' | 'website_reviewed' | 'weekly_digest';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  template: EmailTemplate;
  variables: Record<string, string | number>;
}

/**
 * Sends a high-fidelity HTML email using Resend and local templates.
 */
export async function sendEmail({ to, subject, template, variables }: SendEmailOptions) {
  try {
    // 1. Read the template file
    const templatePath = path.join(process.cwd(), 'emails', `${template}.html`);
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Email template not found: ${templatePath}`);
    }

    let html = fs.readFileSync(templatePath, 'utf8');

    // 2. Replace placeholders {{key}} with values from variables
    // We also provide some defaults if missing
    const vars = {
      preferences_url: 'https://revvview.com/settings',
      unsubscribe_url: 'https://revvview.com/unsubscribe',
      ...variables,
    };

    Object.entries(vars).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(placeholder, String(value));
    });

    // 3. Send via Resend
    const { data, error } = await resend.emails.send({
      from: 'Revvview <team@revvview.com>',
      to,
      subject,
      html,
    });

    if (error) {
      throw new Error(`Resend API error: ${error.message}`);
    }

    return { success: true, data };
  } catch (error: any) {
    console.error(`Failed to send email (${template}):`, error.message);
    return { success: false, error: error.message };
  }
}
