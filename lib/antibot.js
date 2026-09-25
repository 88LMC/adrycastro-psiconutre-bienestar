// Protecciones anti-bot para formularios de suscripcion.
// Contexto: en sept 2026 el formulario de adrycastro.com fue usado para un
// ataque de "subscription bombing" (bots metiendo emails de terceros para
// inundarles la bandeja con nuestros correos). Estas capas lo frenan:
//   1. Origen: solo nuestros dominios.
//   2. Honeypot: campo invisible que una persona nunca llena.
//   3. Trampa de tiempo: un humano tarda mas de 3 s en llenar el form.
//   4. Limite de intentos por IP (en memoria, best-effort).
//   5. Cloudflare Turnstile: se activa solo si existe TURNSTILE_SECRET_KEY.

export const ALLOWED_ORIGINS = [
  'https://plenaconlipedema.com',
  'https://www.plenaconlipedema.com',
  'https://app.plenaconlipedema.com',
  'https://adrycastro.com',
  'https://www.adrycastro.com',
];

const RATE_WINDOW_MS = 10 * 60_000; // 10 minutos
const RATE_MAX = 5;                 // 5 envios por IP por ventana
const hits = new Map();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function applyCors(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function clientIp(req) {
  return (
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // aun no configurado: no bloquear
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token, remoteip: ip });
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = await r.json();
    return data.success === true;
  } catch (err) {
    console.error('Turnstile verify error:', err.message);
    return false;
  }
}

// Devuelve { ok: true, email } o { ok: false, status, message, silent }.
// silent = true -> responder "exito" falso para no darle pistas al bot.
export async function checkSubmission(req) {
  const origin = req.headers.origin;
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return { ok: false, status: 403, message: 'Origen no permitido' };
  }

  const body = req.body || {};

  if (body.website) {
    return { ok: false, silent: true, reason: 'honeypot' };
  }

  const elapsed = Number(body.elapsedMs);
  if (Number.isFinite(elapsed) && elapsed < 3000) {
    return { ok: false, silent: true, reason: 'too-fast' };
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return { ok: false, status: 429, message: 'Demasiados intentos. Espera unos minutos.' };
  }

  const email = String(body.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, status: 400, message: 'Escribe un email válido.' };
  }

  const human = await verifyTurnstile(body.turnstileToken, ip);
  if (!human) {
    return { ok: false, status: 400, message: 'No pudimos verificar que eres una persona. Recarga la página e intenta de nuevo.' };
  }

  return { ok: true, email };
}
