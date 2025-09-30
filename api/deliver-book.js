export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, firstName, lastName, type } = req.body;

  if (!email || !type) {
    return res.status(400).json({ message: 'Email and type are required' });
  }

  try {
    // Configuración de Brevo
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    
    if (!BREVO_API_KEY) {
      throw new Error('Brevo API key not configured');
    }

    // Determinar qué lista usar según el tipo
    let listId;
    if (type === 'purchase') {
      // Para compras completas - lista "lista-comprado" (ID: #5)
      listId = await getListId('lista-comprado');
    } else if (type === 'freebie') {
      // Para adelanto gratuito - lista "extracto-lipedema" (ID: #6)
      listId = await getListId('extracto-lipedema');
    } else {
      return res.status(400).json({ message: 'Invalid type. Use "purchase" or "freebie"' });
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
          LASTNAME: lastName || ''
        },
        listIds: [listId],
        updateEnabled: true // Actualizar si ya existe
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      throw new Error(`Brevo API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Contact added to Brevo successfully:', result);

    return res.status(200).json({ 
      message: 'Email delivery initiated successfully',
      brevoResponse: result
    });

  } catch (error) {
    console.error('Error in deliver-book:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }

  // Función auxiliar para obtener ID de lista por nombre
  async function getListId(listName) {
    const response = await fetch('https://api.brevo.com/v3/contacts/lists', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch lists from Brevo');
    }

    const data = await response.json();
    const list = data.lists.find(list => list.name === listName);
    
    if (!list) {
      throw new Error(`List "${listName}" not found in Brevo`);
    }

    return list.id;
  }
}
