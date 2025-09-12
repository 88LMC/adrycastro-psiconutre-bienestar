import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 wellness-gradient relative overflow-hidden">
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
          
          <div className="pt-4">
            <Button 
              variant="outline" 
              size="hero" 
              className="bg-background/10 border-2 border-background text-background hover:bg-background hover:text-wellness-green text-lg font-semibold backdrop-blur-sm"
            >
              Comienza ahora
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