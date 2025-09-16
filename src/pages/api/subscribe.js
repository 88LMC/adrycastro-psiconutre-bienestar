export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName } = req.body;

  try {
    const response = await fetch(
      `https://${process.env.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName || '',
          },
          tags: ['guia-perimenopausia']
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ success: true, message: 'Suscripción exitosa' });
    } else {
      res.status(400).json({ success: false, message: data.detail || 'Error en suscripción' });
    }
  } catch (error) {
    console.error('Mailchimp error:', error);
    res.status(500).json({ success: false, message: 'Error interno' });
  }
}
