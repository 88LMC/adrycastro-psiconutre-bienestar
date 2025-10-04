import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section id="contacto" className="py-20 wellness-gradient relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
            Tu transformación empieza aquí.{" "}
            <span className="block mt-2">
              Da el paso hacia tu mejor versión.
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            No esperes más para vivir la vida plena y saludable que mereces. 
            Tu bienestar integral está a un click de distancia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="bg-white text-wellness-green hover:bg-gray-100 border-2 border-white text-lg font-bold"
            >
              <Link to="/checkout">
                Comprar Mi Libro ($9)
              </Link>
            </Button>
            <Button 
              onClick={() => {
                alert('Próximamente: Descarga directa de guía');
              }}
              variant="outline" 
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-wellness-green text-lg font-semibold"
            >
              Descargar extracto libro
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-background/10 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-background/10 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-background/5 rounded-full blur-lg" />
    </section>
  );
};

export default CTASection;
