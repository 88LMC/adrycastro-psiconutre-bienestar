import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Sparkles, Flower } from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  {
    id: "lipedema",
    title: "Psiconutrición para el Lipedema",
    description: "La guía completa para entender y manejar el lipedema desde un enfoque integral. Incluye plan de alimentación, estrategias psicológicas y ejercicios específicos.",
    icon: Heart,
    regularPrice: "$49 USD",
    price: "$17 USD",
    status: "available",
    statusText: "PROMOCIÓN LIMITADA",
    cta: "Comprar Ahora",
    features: [
      "Protocolo antiinflamatorio personalizado",
      "Plan de ejercicios específicos para lipedema",
      "Técnicas de autocompasión y autoestima",
      "Garantía de 30 días"
    ],
    highlights: [
      "✅ Descarga inmediata",
      "✅ Formato PDF + Audio",
      "✅ Acceso de por vida"
    ]
  },
  {
    id: "mujeres-40",
    title: "Metabolismo 40+",
    description: "Descubre cómo reactivar tu metabolismo después de los 40. De forma realista y sin evitar las comilonas familiares",
    icon: Sparkles,
    regularPrice: null,
    price: "Próximamente",
    status: "coming-soon",
    statusText: "LANZAMIENTO: FEB 2026",
    cta: "Apúntate a la Lista",
    features: [
      "Nutrición para metabolismo después de los 40",
      "Estrategias hormonales naturales",
      "Rutinas de ejercicio adaptadas",
      "Recetas latinas saludables"
    ],
    highlights: null
  },
  {
    id: "perimenopausia",
    title: "Perimenopausia sin Drama",
    description: "Tu guía para navegar la perimenopausia con confianza.",
    icon: Flower,
    regularPrice: null,
    price: "Próximamente",
    status: "coming-soon",
    statusText: "LANZAMIENTO: MAY 2026",
    cta: "Notifícame",
    features: [
      "Alimentación para equilibrio hormonal",
      "Manejo de síntomas emocionales",
      "Estrategias de bienestar integral",
      "Herramientas de empoderamiento"
    ],
    highlights: null
  }
];

const ProgramsSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleBookAction = (program: typeof programs[0]) => {
    if (program.status === 'available') {
      // Redirect to checkout page
      window.location.href = '/checkout';
    } else {
      // Scroll to contact form for waitlist
      scrollToSection('contacto');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          firstName: '',
          source: 'guia-perimenopausia'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('¡Perfecto! Revisa tu email para descargar la guía.');
        setEmail('');
      } else {
        setMessage(data.message || 'Error al suscribirse. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('Error de conexión. Intenta nuevamente.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="libros" className="py-20 bg-wellness-beige-light">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Libros de <span className="text-wellness-green">Psiconutrición</span> para Mujeres 40+
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Guías prácticas especializadas en lipedema, perimenopausia y bienestar integral para mujeres después de los 40
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((program) => {
            const IconComponent = program.icon;
            const isAvailable = program.status === 'available';
            
            return (
              <Card 
                key={program.id} 
                className={`border-0 shadow-soft bg-card hover:shadow-wellness transition-all duration-300 group relative ${
                  isAvailable ? 'ring-2 ring-wellness-green scale-105' : ''
                }`}
              >
                {/* Status Badge */}
                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                  isAvailable 
                    ? 'bg-wellness-green text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {program.statusText}
                </div>

                <CardHeader className="text-center space-y-4 pt-8">
                  <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isAvailable 
                      ? 'bg-wellness-green/20 group-hover:bg-wellness-green/30' 
                      : 'bg-muted group-hover:bg-muted/80'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      isAvailable ? 'text-wellness-green' : 'text-muted-foreground'
                    }`} />
                  </div>
                  
                  <CardTitle className="text-xl font-semibold text-foreground leading-tight">
                    {program.title}
                  </CardTitle>
                  
                  <CardDescription className="text-base text-muted-foreground">
                    {program.description}
                  </CardDescription>

                  {/* Price Display */}
                  <div className="text-center space-y-2">
                    {program.regularPrice && isAvailable && (
                      <div className="text-lg text-muted-foreground">
                        <span className="line-through">Antes: {program.regularPrice}</span>
                      </div>
                    )}
                    <div className={`text-3xl font-bold flex items-center justify-center gap-2 ${
                      isAvailable ? 'text-wellness-green' : 'text-muted-foreground'
                    }`}>
                      {program.regularPrice && isAvailable && (
                        <span className="text-red-500 font-black text-lg">AHORA:</span>
                      )}
                      {program.price}
                    </div>
                    {program.regularPrice && isAvailable && (
                      <div className="text-sm font-semibold text-red-500">
                        ¡Ahorra $32 USD!
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Urgency banner for available book */}
                  {program.regularPrice && isAvailable && (
                    <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-center">
                      <div className="text-xs font-bold">PROMOCIÓN LIMITADA</div>
                      <div className="text-sm">Solo por tiempo limitado</div>
                    </div>
                  )}

                  <ul className="space-y-3">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          isAvailable ? 'bg-wellness-green' : 'bg-muted-foreground'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Highlights for available book */}
                  {program.highlights && (
                    <div className="bg-wellness-green/10 rounded-lg p-3 space-y-1">
                      {program.highlights.map((highlight, index) => (
                        <div key={index} className="text-xs text-wellness-green font-medium">
                          {highlight}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => handleBookAction(program)}
                    variant={isAvailable ? "default" : "outline"}
                    className={`w-full ${
                      isAvailable 
                        ? 'bg-wellness-green hover:bg-wellness-green/90 text-white' 
                        : 'border-wellness-green text-wellness-green hover:bg-wellness-green hover:text-white'
                    }`}
                    size="lg"
                    aria-label={`${program.cta} - ${program.title}`}
                  >
                    {program.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Lead Magnet Section - UPDATED */}
        <div className="mt-20 bg-gradient-to-r from-wellness-green to-wellness-green/80 rounded-3xl p-8 text-center text-white max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            🎁 Extracto del libro "Plena con lipedema"
          </h3>
          <p className="text-lg mb-6 opacity-95">
            "Descarga GRATIS los primeros 3 capitulos del libro"
          </p>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Tu email principal aquí"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 rounded-full text-foreground outline-none disabled:opacity-50"
              aria-label="Descarga GRATIS los primeros 3 capitulos del libro"
            />
            <Button 
              type="submit"
              disabled={isSubmitting || !email}
              variant="outline" 
              className="bg-white text-wellness-green hover:bg-gray-100 rounded-full border-0 disabled:opacity-50"
              aria-label="Descargar guía gratuita de perimenopausia"
            >
              {isSubmitting ? 'Enviando...' : 'Quiero mi Guía'}
            </Button>
          </form>

          {message && (
            <p className={`text-sm mt-4 ${message.includes('Perfecto') ? 'text-green-200' : 'text-red-200'}`}>
              {message}
            </p>
          )}
          
          <p className="text-sm mt-4 opacity-80">
            ✅ Tips diarios prácticos ✅ Recetas anti-inflamatorias ✅ Técnicas de mindfulness
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
