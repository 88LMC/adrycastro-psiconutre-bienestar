// Suscripcion a listas de Brevo desde los formularios de adrycastro.com.
// Protegido contra bots: ver lib/antibot.js. En sept 2026 este endpoint fue
// usado para un ataque de subscription bombing porque aceptaba cualquier
// origen y mandaba todo por defecto a la lista extracto-lipedema.

import { applyCors, checkSubmission } from '../lib/antibot.js';
import { addToBrevo } from '../lib/brevo-subscribe.js';

// Fuentes aceptadas -> lista de Brevo. Una fuente desconocida se rechaza.
const SOURCES = {
  'extracto-lipedema':     { listId: 6,  doi: true },
  'lead-magnet-3-errores': { listId: 7,  doi: true },
  'waitlist-fundadoras':   { listId: 8,  doi: true },
};

const REDIRECT_AFTER_CONFIRM = 'https://www.adrycastro.com/?suscripcion=confirmada';

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const check = await checkSubmission(req);
  if (!check.ok) {
    if (check.silent) {
      console.warn('Suscripcion descartada (bot):', check.reason);
      return res.status(200).json({ success: true, message: 'Suscripción exitosa' });
    }
    return res.status(check.status).json({ success: false, message: check.message });
  }

  const { firstName, source, country } = req.body || {};
  const config = SOURCES[source];
  if (!config) {
    return res.status(400).json({ success: false, message: 'Formulario no reconocido' });
  }

  try {
    const result = await addToBrevo({
      email: check.email,
      firstName: String(firstName || '').trim().slice(0, 60),
      country,
      source,
      listId: config.listId,
      doi: config.doi,
      redirectionUrl: REDIRECT_AFTER_CONFIRM,
    });

    if (!result.ok) {
      return res.status(502).json({ success: false, message: 'No pudimos registrarte. Intenta de nuevo en un momento.' });
    }
    return res.status(200).json({ success: true, doi: result.doi, message: 'Suscripción exitosa' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ success: false, message: 'Error interno' });
  }
}
