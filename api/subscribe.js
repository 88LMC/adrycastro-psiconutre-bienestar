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

  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email es requerido' 
    });
  }

  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    
    if (!BREVO_API_KEY) {
      throw new Error('Brevo API key not configured');
    }

    // Obtener el ID de la lista "extracto-lipedema"
    const listsResponse = await fetch('https://api.brevo.com/v3/contacts/lists', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'api-key': BREVO_API_KEY
      }
    });

    if (!listsResponse.ok) {
      throw new Error('Failed to fetch lists from Brevo');
    }

    const listsData = await listsResponse.json();
    const extractoList = listsData.lists.find(list => list.name === 'extracto-lipedema');
    
    if (!extractoList) {
      throw new Error('Lista "extracto-lipedema" no encontrada en Brevo');
    }

    // Añadir contacto a la lista en Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: firstName || '',
          LASTNAME: ''
        },
        listIds: [extractoList.id],
        updateEnabled: true // Actualizar si ya existe
      })
    });

    const data = await response.json();

    if (response.ok || response.status === 201) {
      res.status(200).json({ 
        success: true, 
        message: 'Suscripción exitosa' 
      });
    } else {
      console.error('Brevo API error:', data);
      res.status(400).json({ 
        success: false, 
        message: data.message || 'Error en suscripción' 
      });
    }
  } catch (error) {
    console.error('Brevo error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}
