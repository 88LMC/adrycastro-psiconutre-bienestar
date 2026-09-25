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
            Lo que dicen las <span className="text-wellness-green">primeras lectoras</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Los primeros mensajes que recibí sobre <em>Plena con Lipedema</em>.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Placeholder testimonial cards */}
          {[
  {
    id: 1,
    text: "Acabo de terminar de leer tu libro. Gracias por hacerlo, me ha gustado mucho y ahora sé cómo puedo vivir con lipedema. Saber que no era la única fue como quitarme un peso de encima. Te mando un abrazo.",
    author: "Laura",
    location: "Primera lectora",
    condition: "Plena con Lipedema"
  },
  {
    id: 2,
    text: "Es un libro de fácil lectura que te ayuda a valorarte y ver las cosas desde otro punto de vista. La app, ¡súper buena!",
    author: "Faby",
    location: "Primera lectora",
    condition: "Libro + App"
  },
  {
    id: 3,
    text: "Me gustó mucho este libro, la verdad vale la pena leerlo y darle una oportunidad. Muchas gracias, Adry.",
    author: "Kattia",
    location: "Primera lectora",
    condition: "Plena con Lipedema"
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
