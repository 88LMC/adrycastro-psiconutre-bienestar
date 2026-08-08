// Google Analytics + Meta Pixel configuration
//
// Ambos IDs se toman de variables de entorno (configurar en Vercel, proyecto
// de adrycastro.com). Si no estan configuradas, initGA()/initMetaPixel() no
// hacen nada -- no rompen el sitio.
//   VITE_GA4_ID        -> Measurement ID de GA4, formato "G-XXXXXXXXXX"
//                          (debe ser el MISMO que usa plenaconlipedema.com,
//                          para que cuente como una sola propiedad unificada)
//   VITE_META_PIXEL_ID -> Pixel ID de Meta, solo numeros

export const GA_TRACKING_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}');
    `;
    document.head.appendChild(script2);
  }
};

// Initialize Meta Pixel
export const initMetaPixel = () => {
  if (typeof window === 'undefined' || !META_PIXEL_ID || window.fbq) return;

  const fbq: Window['fbq'] = function (...args: unknown[]) {
    if (fbq!.callMethod) {
      fbq!.callMethod(...args);
    } else {
      fbq!.queue!.push(args);
    }
  };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
};

// Track events genericos (solo GA4) -- se mantiene por compatibilidad
export const trackEvent = (action: string, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_label: label,
    });
  }
};

// Alguien llega a la pagina de checkout listo para pagar
export const trackInitiateCheckout = (params: {
  value: number;
  currency?: string;
  content_name?: string;
}) => {
  if (typeof window === 'undefined') return;
  const currency = params.currency || 'USD';

  if (window.gtag) {
    window.gtag('event', 'InitiateCheckout', {
      value: params.value,
      currency,
      content_name: params.content_name,
    });
  }
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: params.value,
      currency,
      content_name: params.content_name,
    });
  }
};

// El pago se confirmo capturado en PayPal (dinero real recibido)
export const trackPurchase = (params: {
  value: number;
  currency?: string;
  content_name?: string;
  transaction_id?: string;
}) => {
  if (typeof window === 'undefined') return;
  const currency = params.currency || 'USD';

  if (window.gtag) {
    window.gtag('event', 'purchase', {
      value: params.value,
      currency,
      transaction_id: params.transaction_id,
      items: [{ item_name: params.content_name }],
    });
  }
  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      value: params.value,
      currency,
      content_name: params.content_name,
    });
  }
};
