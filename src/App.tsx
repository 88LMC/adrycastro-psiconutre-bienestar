import { useEffect } from 'react';
import { initGA, trackEvent } from './lib/analytics';
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
const Success = () => (
  <div className="min-h-screen flex items-center justify-center bg-green-50">
    <div className="text-center max-w-md mx-auto p-8">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          ¡Pago Exitoso!
        </h1>
        <p className="text-gray-600 mb-6">
          Gracias por tu compra. Recibirás un email de confirmación en hola@adrycastro.com con todos los detalles de tu programa.
        </p>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500 mb-2">Próximos pasos:</p>
          <ul className="text-sm text-gray-600 text-left space-y-1">
            <li>• Check tu email para el material del curso</li>
            <li>• Te contactaré en las próximas 24 horas</li>
            <li>• Comenzamos tu transformación juntas</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    initGA();
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

