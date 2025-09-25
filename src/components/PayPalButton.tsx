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
      
      // Entregar libro automáticamente
      try {
        const deliveryResponse = await fetch('/api/deliver-book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: details.payer.email_address,
            paymentId: details.id,
            productName: productName,
            amount: amount,
            customerName: `${details.payer.name?.given_name || ''} ${details.payer.name?.surname || ''}`.trim()
          }),
        });

        const deliveryResult = await deliveryResponse.json();
        
        if (deliveryResult.success) {
          console.log('Libro entregado automáticamente:', deliveryResult);
        } else {
          console.error('Error en entrega automática:', deliveryResult.message);
          // El pago fue exitoso, pero la entrega falló - se puede manejar manualmente
        }
        
      } catch (deliveryError) {
        console.error('Error en entrega automática:', deliveryError);
        // El pago fue exitoso, pero la entrega falló - continuamos normalmente
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
