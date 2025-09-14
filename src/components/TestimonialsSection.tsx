import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
  return (
    <section id="testimonios" className="py-20 bg-wellness-beige-light">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Historias de <span className="text-wellness-green">Transformación</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mujeres reales que han cambiado su vida con psiconutrición
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Placeholder testimonial cards */}
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="border-0 shadow-soft bg-background">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="w-4 h-4 fill-wellness-green text-wellness-green" />
                  ))}
                </div>
                
                <blockquote className="text-muted-foreground italic leading-relaxed">
                  "Después de haber probado de todo, gracias a Adry me di cuenta que el lipedema se afronta de adentro hacia fuera. No a través de cremas mágicas. No hay nada como sentirse bien cuando nos vemos al espejo !"
                </blockquote>
                
                <div className="pt-2">
                  <div className="font-medium text-foreground">Fernanda Cima</div>
                  <div className="text-sm text-muted-foreground">Mexicana. 44 años</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
