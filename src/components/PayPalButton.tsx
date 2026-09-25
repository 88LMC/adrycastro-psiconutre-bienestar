// src/components/PayPalButton.tsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { trackPurchase } from '../lib/analytics';

interface PayPalButtonProps {
  amount: string;
  productName: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  productName,
  onSuccess,
  onError
}) => {
  const paypalOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID!,
    currency: 'USD',
    intent: 'capture',
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: productName,
          amount: {
            currency_code: 'USD',
            value: amount,
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    });
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      console.log('Pago completado:', details);

      // Medir la compra real (pago ya capturado, dinero confirmado)
      trackPurchase({
        value: parseFloat(amount),
        currency: 'USD',
        content_name: productName,
        transaction_id: details.id,
      });
      // Confirmar la compra: el servidor verifica la orden con PayPal, crea el
      // codigo de la app y envia UN email con el libro + el codigo.
      // Si esta llamada falla (red, pestana cerrada), el webhook de PayPal
      // completa la entrega como respaldo.
      try {
        await fetch('https://app.plenaconlipedema.com/api/confirm-purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: details.id }),
        });
      } catch (confirmError) {
        console.error('Error confirmando compra (token app):', confirmError);
      }

      if (onSuccess) {
        onSuccess(details);
      }
      
      // Redirect a página de éxito con información completa
      window.location.href = `/success?payment=${details.id}&email=${encodeURIComponent(details.payer.email_address)}&product=${encodeURIComponent(productName)}&amount=${amount}`;
      
    } catch (error) {
      console.error('Error en el pago:', error);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="paypal-button-container">
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          style={{
            shape: 'rect',
            color: 'blue',
            layout: 'vertical',
            label: 'paypal',
            tagline: false,
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
