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
    // Agregar/actualizar suscriptor en ConvertKit con tag de compra
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
          tags: ['libro-comprado'],
          fields: {
            payment_id: paymentId,
            product: productName || 'Psiconutrición para Lipedema'
          }
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(`Libro entregado a: ${email}, PaymentID: ${paymentId}`);
      
      res.status(200).json({ 
        success: true, 
        message: 'Contacto actualizado y libro marcado para entrega',
        paymentId,
        email
      });
    } else {
      console.error('ConvertKit error:', data);
      res.status(400).json({ 
        success: false, 
        message: data.message || 'Error actualizando contacto' 
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
