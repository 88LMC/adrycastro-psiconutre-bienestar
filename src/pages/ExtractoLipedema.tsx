import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { trackEvent } from '../lib/analytics';

// Pagina a la que apunta el boton "Leer mi extracto gratuito" del email de
// Brevo (automatizacion #2). Antes no existia y daba 404.
const PDF_URL = '/extracto-plena-con-lipedema.pdf';
const BOOK_URL =
  'https://plenaconlipedema.com/?utm_source=brevo&utm_medium=email&utm_campaign=extracto&utm_content=pagina-extracto';

const ExtractoLipedema = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>Tu extracto gratuito | Plena con Lipedema</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="max-w-lg w-full text-center">
        <p className="text-sm font-semibold tracking-wide text-[#49978A] uppercase mb-3">
          Extracto gratuito
        </p>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#2E2E2E] mb-4">
          Aquí está tu extracto de <span className="italic">Plena con Lipedema</span>
        </h1>
        <p className="text-[#2E2E2E]/80 leading-relaxed mb-8">
          Los primeros capítulos del libro, para que entiendas qué le pasa a tu cuerpo
          y sepas que no estás sola. Se abre en tu celular o computadora, sin instalar nada.
        </p>
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener"
          onClick={() => trackEvent('extract_download', 'extracto-lipedema')}
          className="inline-block w-full sm:w-auto rounded-full bg-[#49978A] px-10 py-4 text-lg font-semibold text-white shadow-md hover:bg-[#3d8277] transition-colors"
        >
          📖 Abrir mi extracto (PDF)
        </a>
        <p className="mt-3 text-xs text-[#2E2E2E]/60">
          Si no se abre, mantén presionado el botón y elige “Descargar”.
        </p>

        <div className="mt-12 rounded-2xl border border-[#e0e0e0] bg-white p-6 text-left">
          <h2 className="font-playfair text-xl font-bold text-[#2E2E2E] mb-2">
            ¿Quieres seguir leyendo?
          </h2>
          <p className="text-[#2E2E2E]/80 leading-relaxed mb-4">
            El libro completo trae el Método A.M.A.R. paso a paso y una app que te
            acompaña cada día según cómo amaneciste. Pago único, con 30 días de garantía.
          </p>
          <a
            href={BOOK_URL}
            className="inline-block rounded-full border-2 border-[#BF4E28] px-6 py-2 font-semibold text-[#BF4E28] hover:bg-[#BF4E28] hover:text-white transition-colors"
          >
            Conocer el libro + la app
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExtractoLipedema;
