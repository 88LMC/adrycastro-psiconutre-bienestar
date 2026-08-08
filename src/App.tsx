import { useEffect } from 'react';
import { initGA, initMetaPixel, trackEvent } from './lib/analytics';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import TermsConditions from "./pages/TermsConditions";
import Checkout from "./pages/Checkout"; // Nueva importación para PayPal

const queryClient = new QueryClient();

// Componente simple para página de éxito
const Success = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get('email');
  const paymentId = searchParams.get('payment');
  const product = searchParams.get('product');
  const amount = searchParams.get('amount');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-[#EAF3F0] border-2 border-[#49978A] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#49978A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-playfair text-3xl font-bold text-[#2E2E2E] mb-4">
            ¡Compra Exitosa!
          </h1>
          <p className="text-[#2E2E2E]/80 mb-4">
            Tu compra de <strong>"{product || 'Plena con Lipedema'}"</strong> por <strong>${amount} USD</strong> se procesó correctamente.
          </p>
          {email && (
            <div className="bg-[#EAF3F0] border border-[#9DB39A] p-4 rounded-lg mb-6">
              <p className="text-[#2E2E2E] font-semibold mb-2">📚 Tu libro y tu app:</p>
              <p className="text-[#2E2E2E]/80 text-sm">
                El libro y el código de acceso a la app se envían automáticamente a <strong>{email}</strong> en los próximos 5 minutos.
              </p>
            </div>
          )}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e0e0e0]">
            <p className="text-sm text-[#2E2E2E]/60 mb-2">Próximos pasos:</p>
            <ul className="text-sm text-[#2E2E2E]/80 text-left space-y-1">
              <li>• Revisa tu bandeja de entrada y carpeta de spam</li>
              <li>• El libro y la app se envían desde hola@adrycastro.com</li>
              <li>• Si no lo recibes en 10 minutos, contáctanos</li>
              <li>• Descarga inmediata en formato PDF</li>
            </ul>
          </div>
          {paymentId && (
            <p className="text-xs text-[#2E2E2E]/40 mt-4">
              ID de compra: {paymentId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    initGA();
    initMetaPixel();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/checkout" element={<Checkout />} /> {/* Nueva ruta PayPal */}
              <Route path="/success" element={<Success />} /> {/* Página de éxito PayPal */}
              <Route path="/terminos-condiciones" element={<TermsConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;

