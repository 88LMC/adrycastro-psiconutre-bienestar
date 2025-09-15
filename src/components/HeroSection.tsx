import { Button } from "@/components/ui/button";
import heroImage from "@/assets/adry-1-fondo.jpeg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section id="inicio" className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Transforma tu{" "}
              <span className="text-wellness-green">relación</span> con la comida después de los 40 años
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Descubre el poder de la psiconutrición para afrontar el lipedema, la perimenopausia y los cambios metabólicos. Método integral y resultados reales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => scrollToSection('libros')}
                variant="default" 
                size="lg" 
                className="text-lg bg-wellness-green hover:bg-wellness-green-light text-white"
                aria-label="Ver libros de psiconutrición para mujeres 40+"
              >
                Descubre Mis Libros
              </Button>
              <Button 
                onClick={() => scrollToSection('sobre-mi')}
                variant="outline" 
                size="lg" 
                className="text-lg border-2 border-wellness-green text-wellness-green hover:bg-wellness-green hover:text-white"
                aria-label="Conocer la historia de Adry Castro"
              >
                Conoce Mi Historia
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-wellness">
              <img 
                src={heroImage} 
                alt="Adry Castro - Especialista en psiconutrición para mujeres de 40+ años con lipedema y perimenopausia"
                className="w-full h-full object-cover"
                loading="eager"
                width="600"
                height="750"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-wellness-green/10 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-wellness-beige/30 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
