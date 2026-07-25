export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ message: 'Invalid JSON body' });
    }
  }

  const { email, paymentId, productName, amount, customerName } = body || {};

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) throw new Error('Brevo API key not configured');

    let listName;
    if (productName && productName.includes('Fundadoras')) {
      listName = 'lista-fundadoras';
    } else if (productName && productName.includes('Comunidad')) {
      listName = 'lista-comunidad';
    } else {
      listName = 'lista-comprado';
    }

    const listId = await getListId(listName, BREVO_API_KEY);

    const nameParts = (customerName || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

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
          FIRSTNAME: firstName,
          NOMBRE: firstName,
          LASTNAME: lastName
        },
        listIds: [listId],
        updateEnabled: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error('Brevo API error: ' + response.status + ' ' + JSON.stringify(errorData));
    }

    
    return res.status(200).json({ success: true, message: 'Delivery initiated', list: listName });

  } catch (error) {
    console.error('Error in deliver-book:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }

  async function getListId(listName, apiKey) {
    const response = await fetch('https://api.brevo.com/v3/contacts/lists', {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'api-key': apiKey }
    });
    if (!response.ok) throw new Error('Failed to fetch lists from Brevo');
    const data = await response.json();
    const list = data.lists.find(l => l.name === listName);
    if (!list) throw new Error('List not found: ' + listName);
    return list.id;
  }
}
