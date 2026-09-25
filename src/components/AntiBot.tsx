// Campos anti-bot para formularios de suscripcion (ver lib/antibot.js en el
// backend). Uso:
//   const antibot = useAntiBot();
//   <form>... <AntiBotFields antibot={antibot} /> ...</form>
//   body: JSON.stringify({ ...datos, ...antibot.payload() })
//   si falla: antibot.reset()

import { useCallback, useEffect, useRef, useState } from "react";

// Clave PUBLICA de Cloudflare Turnstile (es seguro que este en el codigo).
// Mientras este vacia, el widget no se muestra y el backend no lo exige
// (a menos que ya exista TURNSTILE_SECRET_KEY en Vercel).
export const TURNSTILE_SITE_KEY: string =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || "0x4AAAAAAFDutFgxMbL-E_4I";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
  return new Promise((resolve) => {
    const script = (existing as HTMLScriptElement) || document.createElement("script");
    script.addEventListener("load", () => resolve());
    if (!existing) {
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
}

export function useAntiBot() {
  const startedAt = useRef(Date.now());
  const [website, setWebsite] = useState("");
  const [token, setToken] = useState("");
  const widgetId = useRef<string | undefined>(undefined);

  const payload = useCallback(
    () => ({
      website,
      elapsedMs: Date.now() - startedAt.current,
      turnstileToken: token,
    }),
    [website, token]
  );

  const reset = useCallback(() => {
    setToken("");
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, []);

  return {
    website,
    setWebsite,
    token,
    setToken,
    widgetId,
    payload,
    reset,
    // true cuando el formulario puede enviarse (sin Turnstile configurado, siempre)
    ready: !TURNSTILE_SITE_KEY || Boolean(token),
  };
}

type AntiBot = ReturnType<typeof useAntiBot>;

export function AntiBotFields({ antibot }: { antibot: AntiBot }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setToken, widgetId } = antibot;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !containerRef.current) return;
    let cancelled = false;
    loadTurnstile().then(() => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        language: "es",
        theme: "light",
        callback: (t: string) => setToken(t),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    });
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
    };
  }, [setToken, widgetId]);

  return (
    <>
      {/* Honeypot: invisible para personas, los bots lo llenan */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label>
          No llenes este campo
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={antibot.website}
            onChange={(e) => antibot.setWebsite(e.target.value)}
          />
        </label>
      </div>
      {TURNSTILE_SITE_KEY && <div ref={containerRef} className="flex justify-center" />}
    </>
  );
}
