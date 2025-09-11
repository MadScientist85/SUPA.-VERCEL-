import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AI Assistant <noreply@yourdomain.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      success: false,
      error: 'Failed to send email',
    };
  }
}

export async function sendChatSummary(
  email: string,
  chatId: string,
  messages: any[]
) {
  const summary = messages
    .map(m => `${m.role}: ${m.content.substring(0, 100)}...`)
    .join('\n\n');

  return sendEmail({
    to: email,
    subject: `Chat Summary - ${chatId}`,
    html: `
      <h2>Chat Summary</h2>
      <p>Chat ID: ${chatId}</p>
      <p>Messages: ${messages.length}</p>
      <pre>${summary}</pre>
      <p><a href="https://yourdomain.com/chat/${chatId}">View Full Chat</a></p>
    `,
    text: summary,
  });
}
