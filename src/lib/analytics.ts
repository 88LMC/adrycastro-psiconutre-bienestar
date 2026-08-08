// Google Analytics + Meta Pixel configuration

export const GA_TRACKING_ID = 'G-Y4WPXS0TWS';

// Meta Pixel ID: se toma de la variable de entorno VITE_META_PIXEL_ID
// (configurar en Vercel, proyecto de adrycastro.com). Si no esta configurada,
// initMetaPixel() no hace nada -- no rompe el sitio.
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: unknown;
  }
}

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
