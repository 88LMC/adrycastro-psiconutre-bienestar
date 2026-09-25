// Aviso que se muestra cuando la persona vuelve del email de doble opt-in
// (Brevo redirige a ?suscripcion=confirmada). Sin esto, llegaba a la home
// sin saber que el siguiente paso es revisar su correo.

import { useEffect, useState } from "react";

const ConfirmedBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("suscripcion") === "confirmada") {
      setVisible(true);
      params.delete("suscripcion");
      const qs = params.toString();
      window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-lg bg-white border-2 border-[#49978A] rounded-2xl shadow-2xl p-5 flex items-start gap-3"
    >
      <span className="text-2xl leading-none" aria-hidden="true">💚</span>
      <div className="flex-1 text-left">
        <p className="font-bold text-[#2E2E2E]">¡Email confirmado!</p>
        <p className="text-sm text-[#2E2E2E]/80 mt-1">
          En unos minutos te llega a tu correo lo que pediste. Si no lo ves,
          revisa también Promociones o Spam.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Cerrar"
        className="text-[#2E2E2E]/60 hover:text-[#2E2E2E] text-xl leading-none px-1"
      >
        ×
      </button>
    </div>
  );
};

export default ConfirmedBanner;
