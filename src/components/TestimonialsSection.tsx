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
          {[
  {
    id: 1,
    text: "Después de leer el libro de Adry sobre lipedema, finalmente entendí que no estaba loca. Sus estrategias me ayudaron a reducir la inflamación y, por primera vez en años, me siento esperanzada.",
    author: "María Elena R.",
    location: "México, 45 años",
    condition: "Lipedema"
  },
  {
    id: 2, 
    text: "La psiconutrición cambió mi vida. Adry me enseñó que mi relación con la comida tenía más que ver con mis emociones que con falta de voluntad. ¡Gracias por devolverme la confianza!",
    author: "Carmen S.",
    location: "Colombia, 42 años", 
    condition: "Autoestima alimentaria"
  },
  {
    id: 3,
    text: "Como mexicana viviendo en Estados Unidos, me sentía perdida con tanto consejo que no se aplicaba a nuestra cultura. Adry entiende nuestras necesidades únicas. Su enfoque es real y funciona.",
    author: "Ana Patricia M.", 
    location: "Texas, USA, 48 años",
    condition: "Perimenopausia"
  }
].map((testimonial) => (
  <Card key={testimonial.id} className="border-0 shadow-soft bg-background hover:shadow-xl transition-all duration-300 group">
    <CardContent className="p-6 space-y-4">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star key={starIndex} className="w-4 h-4 fill-wellness-green text-wellness-green" />
        ))}
      </div>
      
      <div className="text-4xl text-wellness-green/30 font-bold leading-none">"</div>
      
      <blockquote className="text-muted-foreground italic leading-relaxed">
        {testimonial.text}
      </blockquote>
      
      <div className="pt-2 border-t border-gray-100">
        <div className="font-medium text-foreground">
          {testimonial.author}
        </div>
        <div className="text-sm text-muted-foreground">
          {testimonial.location}
        </div>
        <div className="text-xs text-wellness-green font-medium mt-2 bg-wellness-green/10 inline-block px-3 py-1 rounded-full">
          {testimonial.condition}
        </div>
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
