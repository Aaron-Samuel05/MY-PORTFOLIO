export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured yet.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['aaronsamuel0205@gmail.com'],
        reply_to: email,
        subject: subject?.trim() || `Portfolio message from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          '',
          'Message:',
          message,
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Email service could not send the message.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Unable to send the message right now.' });
  }
}
