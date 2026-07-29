// src/pages/Checkout.tsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PayPalButton from '../components/PayPalButton';

const PLANS: Record<string, {
  id: string27
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
    description: 'El libro completo + 5 documentos bonus. Tu punto de partida con el Método A.M.A.R.',
    features: [
      '12 capítulos de transformación integral',
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
      'Todo lo del libro ($)',
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

  const handlePaymentSuccess = (details: any) => {
    console.log('Compra exitosa:', details);
  };

  const handlePaymentError = () => {
    alert('Hubo un error con el pago. Intenta de nuevo o escribe a hola@adrycastro.com');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{plan.name}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{plan.description}</p>
          {plan.badge && (
            <span className="inline-block mt-4 px-4 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">
              {plan.badge}
            </span>
          )}
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-32 h-40 rounded-lg mx-auto mb-4 overflow-hidden shadow-lg">
                <img src="/libro-lipedema-cover.jpg" alt="Portada Plena con Lipedema" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-purple-800">Lo que incluye:</h3>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5 text-lg">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Detalles de entrega:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Acceso inmediato tras el pago</li>
                <li>• Compatible con todos los dispositivos</li>
                <li>• Garantía de satisfacción 30 días</li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-800">Completa tu Compra</h2>
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-purple-600">${plan.price}</span>
              <span className="text-gray-600 ml-2 text-lg">USD</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Resumen del Pedido</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-gray-700">{plan.name}</span>
                <span className="font-bold text-gray-900">${plan.price}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                <span>Descarga inmediata</span><span>Incluida</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <span>Actualizaciones gratuitas</span><span>Incluidas</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">${plan.price} USD</span>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-4 text-gray-700">Pago Seguro con PayPal</h3>
              <PayPalButton amount={plan.price} productName={plan.name} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
            </div>
            <div className="text-center space-y-2 text-sm text-gray-500">
              <p>🔒 Pago 100% seguro y encriptado</p>
              <p>📧 Link de acceso enviado inmediatamente</p>
              <p>💳 Acepta todas las tarjetas principales</p>
              <p>🌍 Disponible internacionalmente</p>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 text-center">
              <h4 className="font-bold text-green-800 mb-2">🛡️ Garantía de Satisfacción 30 Días</h4>
              <p className="text-sm text-green-700">Si no encuentras valor, te devolvemos el 100%. Sin preguntas.</p>
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-center text-sm text-orange-800"><span className="font-semibold">Oferta especial:</span> Este precio es por tiempo limitado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
