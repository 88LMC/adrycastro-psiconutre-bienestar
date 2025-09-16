import SEO from "../components/SEO";
import Header from "@/components/Header";

const TermsConditions = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO 
        title="Términos y Condiciones - Adry Castro Psiconutrición"
        description="Términos y condiciones de uso para los servicios y productos de psiconutrición de Adry Castro."
        url="https://adrycastro.com/terminos-condiciones"
      />
      <Header />
      
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Términos y Condiciones</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Información General</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estos términos y condiciones rigen el uso de los servicios y productos digitales ofrecidos por 
              Adry Castro a través del sitio web adrycastro.com. Al realizar una compra o utilizar nuestros 
              servicios, aceptas estos términos en su totalidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Productos Digitales</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nuestros productos incluyen libros electrónicos, guías y materiales educativos en formato digital 
              sobre psiconutrición y bienestar integral.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Los productos son de descarga inmediata tras el pago confirmado</li>
              <li>El acceso es de por vida para el comprador</li>
              <li>Los materiales son únicamente para uso personal y no comercial</li>
              <li>Está prohibida la redistribución, copia o reventa de los materiales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Pagos y Facturación</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Los pagos se procesan de forma segura a través de Paddle. Aceptamos las siguientes formas de pago:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Tarjetas de crédito y débito (Visa, MasterCard, American Express)</li>
              <li>PayPal</li>
              <li>Transferencias bancarias (según disponibilidad regional)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Los precios están expresados en dólares americanos (USD) e incluyen todos los impuestos aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Política de Reembolso</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ofrecemos una garantía de satisfacción de 30 días para todos nuestros productos digitales:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Puedes solicitar un reembolso completo dentro de los 30 días posteriores a la compra</li>
              <li>El reembolso se procesará a través del mismo método de pago utilizado</li>
              <li>Para solicitar un reembolso, contacta a hola@adrycastro.com</li>
              <li>Los reembolsos se procesan en un plazo de 5-7 días hábiles</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Limitación de Responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              Los contenidos y servicios ofrecidos son de naturaleza educativa e informativa. No constituyen 
              asesoramiento médico profesional. Es importante consultar con un profesional de la salud antes 
              de implementar cambios significativos en tu alimentación o estilo de vida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Privacidad y Protección de Datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Respetamos tu privacidad y protegemos tus datos personales de acuerdo con nuestra Política de 
              Privacidad. Los datos de pago son procesados de forma segura por Paddle y no son almacenados 
              en nuestros servidores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Propiedad Intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todos los contenidos, incluyendo textos, imágenes, videos y materiales educativos, son propiedad 
              exclusiva de Adry Castro y están protegidos por las leyes de derechos de autor. El uso no autorizado 
              está prohibido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Modificaciones</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones 
              entrarán en vigor inmediatamente después de su publicación en el sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Ley Aplicable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estos términos se rigen por las leyes de Costa Rica. Cualquier disputa será resuelta en los 
              tribunales competentes de Costa Rica.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para cualquier consulta relacionada con estos términos y condiciones, puedes contactarnos:
            </p>
            <div className="bg-wellness-beige-light p-6 rounded-lg mt-4">
              <p className="text-muted-foreground"><strong>Email:</strong> hola@adrycastro.com</p>
              <p className="text-muted-foreground"><strong>Sitio web:</strong> www.adrycastro.com</p>
            </div>
          </section>

          <section className="border-t pt-8">
            <p className="text-sm text-muted-foreground">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-CR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsConditions;
