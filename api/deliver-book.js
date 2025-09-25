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

  const { email, paymentId, productName } = req.body;

  if (!email || !paymentId) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email y paymentId son requeridos' 
    });
  }

  try {
    // Agregar/actualizar contacto en Mailchimp con información de compra
    const response = await fetch(
      `https://${process.env.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members/${Buffer.from(email.toLowerCase()).toString('hex')}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            LBOOK: 'YES', // Campo personalizado: tiene libro
            PAYID: paymentId, // ID del pago
            PRODUCT: productName || 'Psiconutrición para Lipedema'
          },
          tags: ['libro-comprado', 'lipedema-completo', 'cliente-pagado']
        }),
      }
    );

    const data = await response.json();

    if (response.ok || response.status === 200) {
      // Log para debugging
      console.log(`Libro entregado a: ${email}, PaymentID: ${paymentId}`);
      
      res.status(200).json({ 
        success: true, 
        message: 'Contacto actualizado y libro marcado para entrega',
        paymentId,
        email
      });
    } else {
      console.error('Mailchimp error:', data);
      res.status(400).json({ 
        success: false, 
        message: data.detail || 'Error actualizando contacto' 
      });
    }

  } catch (error) {
    console.error('Delivery error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
}
