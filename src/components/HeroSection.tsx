import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-woman.jpg";

const HeroSection = () => {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Psiconutrición para{" "}
              <span className="text-wellness-green">transformar</span> tu cuerpo, 
              tu mente y tu vida
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Descubre el poder de unir la psicología y la nutrición para recuperar 
              tu autoestima, encontrar el equilibrio y vivir la vida que mereces.
            </p>
            
            <div className="pt-4">
              <Button variant="hero" size="hero" className="text-lg">
                Descubre mis programas
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-wellness">
              <img 
                src={heroImage} 
                alt="Mujer empoderada de 40+ años - Transformación y bienestar"
                className="w-full h-full object-cover"
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