// src/pages/Checkout.tsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PayPalButton from '../components/PayPalButton';
import { trackInitiateCheckout } from '../lib/analytics';

const PLANS: Record<string, {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
}> = {
  libro: {
    id: 'libro-plena-con-lipedema',
    name: 'Plena con Lipedema',
    price: '27',
    description: 'El libro completo + la app personalizada + 5 documentos bonus. Tu punto de partida con el Método A.M.A.R.',
    features: [
      '9 capítulos de transformación integral',
      'App personalizada con IA — tu guía diaria, de por vida',
      'Workbook de las 7 herramientas A.M.A.R.',
      'Tracker de síntomas 30 días',
      'Guía de ropa y compresión',
      'Plan alimentación 7 días',
      'Checklist médica',
    ],
  },
  comunidad: {
    id: 'libro-comunidad-plena',
    name: 'Libro + Comunidad Plena',
    price: '97',
    description: 'Todo lo del libro más acceso a una comunidad privada de mujeres con lipedema y una sesión grupal mensual con Adry.',
    badge: 'Más popular',
    features: [
      'Todo lo del libro ($27) + la app',
      'Comunidad privada en Telegram',
      '1 sesión grupal en vivo por Zoom al mes',
      'Preguntas directas a Adry',
      'Apoyo de mujeres que entienden lo que vives',
    ],
  },
  fundadoras: {
    id: 'grupo-fundadoras',
    name: 'Grupo Fundadoras',
    price: '397',
    description: 'El primer grupo de acompañamiento grupal de Adry. 21 mujeres, 4 sesiones en vivo, 2 meses de seguimiento personalizado.',
    badge: '10 de Mayo · Solo 21 Plazas',
    features: [
      'Todo lo del libro + comunidad',
      '4 sesiones en vivo con Adry (2 meses)',
      'Seguimiento personalizado',
      'Grupo exclusivo de 21 mujeres',
      'Primera vez que Adry ofrece esto',
      'Inicia 10 de mayo — plazas limitadas',
    ],
  },
};

const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const planKey = searchParams.get('plan') || 'libro';
  const plan = PLANS[planKey] || PLANS.libro;

  useEffect(() => {
    trackInitiateCheckout({
      value: parseFloat(plan.price),
      currency: 'USD',
      content_name: plan.name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planKey]);

  const handlePaymentSuccess = (details: any) => {
    console.log('Compra exitosa:', details);
  };

  const handlePaymentError = () => {
    alert('Hubo un error con el pago. Intenta de nuevo o escribe a hola@adrycastro.com');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-[#2E2E2E] mb-4">{plan.name}</h1>
          <p className="text-xl text-[#2E2E2E]/80 max-w-2xl mx-auto">{plan.description}</p>
          {plan.badge && (
            <span className="inline-block mt-4 px-4 py-1 bg-[#BF4E28] text-white text-sm font-semibold rounded-full">
              {plan.badge}
            </span>
          )}
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-[#e0e0e0] rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-40 sm:w-48 aspect-[3/4] rounded-xl mx-auto mb-4 overflow-hidden shadow-lg">
                <img
                  src="/libro-lipedema-cover.jpg"
                  alt="Portada del libro Plena con Lipedema, de Adry Castro"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-[#2E2E2E] mb-2">{plan.name}</h2>
            </div>
            <div className="space-y-4">
              <h3 className="font-playfair font-bold text-lg text-[#2E2E2E]">Lo que incluye:</h3>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#49978A] mr-3 mt-0.5 text-lg">✓</span>
                    <span className="text-[#2E2E2E]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 p-4 bg-[#EAF3F0] rounded-lg border border-[#9DB39A]">
              <h4 className="font-semibold text-[#49978A] uppercase tracking-wide text-xs mb-2">Detalles de entrega</h4>
              <ul className="text-sm text-[#2E2E2E] space-y-1">
                <li>• Acceso inmediato tras el pago — libro por email</li>
                <li>• Código de acceso a la app en el mismo email</li>
                <li>• Compatible con todos los dispositivos</li>
                <li>• Garantía de satisfacción 30 días</li>
              </ul>
            </div>
          </div>
          <div className="bg-white border border-[#e0e0e0] rounded-2xl shadow-xl p-8">
            <h2 className="font-playfair text-2xl font-bold mb-6 text-[#2E2E2E]">Completa tu Compra</h2>
            <div className="text-center mb-6">
              <span className="font-playfair text-5xl font-bold text-[#2E2E2E]">${plan.price}</span>
              <span className="text-[#2E2E2E]/60 ml-2 text-lg">USD</span>
            </div>
            <div className="bg-[#FAF9F7] border border-[#e0e0e0] rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 text-[#2E2E2E]">Resumen del Pedido</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-[#2E2E2E]">{plan.name}</span>
                <span className="font-bold text-[#2E2E2E]">${plan.price}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-[#2E2E2E]/70 mb-3">
                <span>Descarga inmediata</span><span>Incluida</span>
              </div>
              <div className="flex justify-between items-center text-sm text-[#2E2E2E]/70 mb-3">
                <span>App personalizada</span><span>Incluida</span>
              </div>
              <div className="flex justify-between items-center text-sm text-[#2E2E2E]/70 mb-4">
                <span>Actualizaciones gratuitas</span><span>Incluidas</span>
              </div>
              <div className="border-t border-[#e0e0e0] pt-4">
                <div className="flex justify-between items-center text-xl font-bold text-[#2E2E2E]">
                  <span>Total</span>
                  <span>${plan.price} USD</span>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold mb-1 text-[#2E2E2E]">Pago seguro — tarjeta o PayPal</h3>
              <p className="text-sm text-[#2E2E2E]/70 mb-4">
                No necesitas cuenta de PayPal: puedes pagar directo con tu tarjeta de débito o crédito.
              </p>
              <PayPalButton amount={plan.price} productName={plan.name} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
            </div>
            <div className="text-center space-y-2 text-sm text-[#2E2E2E]/70 mt-4">
              <p>🔒 Pago 100% seguro y encriptado</p>
              <p>📧 Link de acceso enviado inmediatamente</p>
              <p>💳 Acepta todas las tarjetas principales</p>
              <p>🌍 Disponible internacionalmente</p>
            </div>
            <div className="mt-6 p-4 bg-[#EAF3F0] rounded-lg border-2 border-[#49978A] text-center">
              <h4 className="font-bold text-[#2E2E2E] mb-2">🛡️ Garantía Plena — 30 Días</h4>
              <p className="text-sm text-[#2E2E2E]">Si no encuentras valor, te devolvemos el 100%. Sin preguntas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
