export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName, source } = req.body;

  try {
    const response = await fetch(
      'https://api.convertkit.com/v3/subscribers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: process.env.CONVERTKIT_API_KEY,
          email: email,
          first_name: firstName || '',
          tags: [source || 'guia-perimenopausia']
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ success: true, message: 'Suscripción exitosa' });
    } else {
      res.status(400).json({ 
        success: false, 
        message: data.message || 'Error en suscripción' 
      });
    }
  } catch (error) {
    console.error('ConvertKit error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
}
