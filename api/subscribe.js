export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email, firstName, source, country } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email es requerido' });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    return res.status(500).json({ success: false, message: 'API key no configurada' });
  }

  try {
    // Determinar lista según fuente
    const listName = getListName(source);

    // Obtener listas de Brevo
    const listsResponse = await fetch('https://api.brevo.com/v3/contacts/lists?limit=50', {
      headers: { 'Accept': 'application/json', 'api-key': BREVO_API_KEY }
    });

    if (!listsResponse.ok) throw new Error('No se pudieron obtener las listas de Brevo');

    const listsData = await listsResponse.json();
    const list = listsData.lists.find(l => l.name === listName);

    if (!list) {
      throw new Error(`Lista "${listName}" no encontrada en Brevo. Créala primero.`);
    }

    // Armar atributos
    const attributes = { FIRSTNAME: firstName || '' };
    if (country) attributes.COUNTRY = country;
    if (source) attributes.SOURCE = source;

    // Añadir contacto
    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        attributes,
        listIds: [list.id],
        updateEnabled: true
      })
    });

    const contactData = await contactResponse.json();

    if (contactResponse.ok || contactResponse.status === 201) {
      return res.status(200).json({ success: true, message: 'Suscripción exitosa' });
    } else {
      console.error('Brevo error:', contactData);
      return res.status(400).json({
        success: false,
        message: contactData.message || 'Error al suscribirse'
      });
    }

  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno',
      error: error.message
    });
  }
}

// Mapeo de fuente → nombre de lista en Brevo
function getListName(source) {
  const map = {
    'lead-magnet-3-errores': 'lead-magnet-3-errores',
    'waitlist-fundadoras':   'waitlist-fundadoras',
    'extracto-lipedema':     'extracto-lipedema',
    'guia-perimenopausia':   'extracto-lipedema',
  };
  return map[source] || 'extracto-lipedema';
}
