// src/pages/Checkout.tsx
import React from 'react';
import PayPalButton from '../components/PayPalButton';

const Checkout: React.FC = () => {
  // Información del libro sobre lipedema
  const book = {
    id: 'libro-psiconutricion-lipedema',
    name: 'Plena con lipedema',
    price: '9',
    originalPrice: '33',
    description: 'La guía completa para entender y manejar el lipedema desde un enfoque integral',
    features: [
      'Comprensión profunda del lipedema y sus características',
      'Plan de alimentación antiinflamatorio',
      'Estrategias psicológicas para el manejo emocional',
      'Metodología SANAR de las 5 esferas',
      'Estrategias de autocuidado y autocompasión '
    ],
    deliveryInfo: [
      'Descarga inmediata en formato PDF',
      'Compatible con todos los dispositivos',
      'Más de 150 páginas de contenido especializado',
      'Acceso de por vida al material',
      'Garantía de satisfacción 30 días'
    ]
  };

  const handlePaymentSuccess = (details: any) => {
    console.log('Compra exitosa del libro de lipedema:', details);
  };

  const handlePaymentError = (error: any) => {
    alert('Hubo un error con el pago. Por favor intenta nuevamente o contacta a hola@adrycastro.com para asistencia.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plena con Lipedema
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tu guía completa para manejar el lipedema con un enfoque integral de alimentación y bienestar
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-32 h-40 rounded-lg mx-auto mb-4 overflow-hidden shadow-lg">
                <img 
                  src="/libro-lipedema-cover.jpg" 
                  alt="Portada Plena con Lipedema"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {book.name}
              </h2>
              <p className="text-gray-600 text-lg">
                {book.description}
              </p>
            </div>

            {/* Discount Badge */}
            <div className="text-center mb-6">
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
                Ahorra $24 - Oferta por tiempo limitado
              </span>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-purple-800">
                Lo que incluye tu guía:
              </h3>
              <ul className="space-y-2">
                {book.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5 text-lg">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Detalles de entrega:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {book.deliveryInfo.map((info, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    {info}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-800">
              Completa tu Compra
            </h2>
            
            {/* Pricing */}
            <div className="text-center mb-6">
              <div className="mb-4">
                <span className="text-2xl text-gray-400 line-through mr-3">
                  ${book.originalPrice}
                </span>
                <span className="text-4xl font-bold text-purple-600">
                  ${book.price}
                </span>
                <span className="text-gray-600 ml-2">USD</span>
              </div>
              <p className="text-green-600 font-semibold text-lg">
                ¡Ahorra $24 hoy!
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Resumen del Pedido</h3>
              
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-gray-700">
                  {book.name}
                </span>
                <span className="font-bold text-gray-900">
                  ${book.price}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                <span>Descarga inmediata</span>
                <span>Incluida</span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <span>Actualizaciones gratuitas</span>
                <span>Incluidas</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">${book.price} USD</span>
                </div>
              </div>
            </div>

            {/* PayPal Payment */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4 text-gray-700">
                Pago Seguro con PayPal
              </h3>
              
              <PayPalButton
                amount={book.price}
                productName={book.name}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>

            {/* Trust Indicators */}
            <div className="text-center space-y-2 text-sm text-gray-500">
              <p className="flex items-center justify-center">
                <span className="mr-2">🔒</span>
                Pago 100% seguro y encriptado
              </p>
              <p className="flex items-center justify-center">
                <span className="mr-2">📧</span>
                Link de descarga enviado inmediatamente
              </p>
              <p className="flex items-center justify-center">
                <span className="mr-2">💳</span>
                Acepta todas las tarjetas principales
              </p>
              <p className="flex items-center justify-center">
                <span className="mr-2">🌍</span>
                Disponible internacionalmente
              </p>
            </div>

            {/* Money Back Guarantee */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-center">
                <h4 className="font-bold text-green-800 mb-2">
                  🛡️ Garantía de Satisfacción 30 Días
                </h4>
                <p className="text-sm text-green-700">
                  Si no encuentras valor en esta guía, te devolvemos el 100% de tu inversión. 
                  Sin preguntas, sin complicaciones.
                </p>
              </div>
            </div>

            {/* Urgency */}
            <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-center text-sm text-orange-800">
                <span className="font-semibold">Oferta especial:</span> Este precio promocional es por tiempo limitado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
