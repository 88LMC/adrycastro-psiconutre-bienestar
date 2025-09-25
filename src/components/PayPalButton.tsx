// src/components/PayPalButton.tsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

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
      
      if (onSuccess) {
        onSuccess(details);
      }
      
      // Redirect a página de éxito
      window.location.href = `/success?payment=${details.id}&amount=${amount}&product=${encodeURIComponent(productName)}`;
      
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