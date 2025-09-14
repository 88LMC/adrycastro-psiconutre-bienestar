import adryPhoto from "@/assets/adry politica 2.jpeg";

const AboutSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Photo */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-wellness max-w-md mx-auto">
              <img 
                src={adryPhoto} 
                alt="Adry Castro - Psiconutricionista y mentora en desarrollo humano"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-wellness-beige/40 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-wellness-green/20 rounded-full blur-lg" />
          </div>
          
          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Sobre <span className="text-wellness-green">Adry</span>
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                <p>
                  Soy Adry Castro, psiconutricionista y mentora en desarrollo humano. 
                  Uno la psicología y la nutrición para ayudarte a recuperar tu autoestima, 
                  equilibrio y salud.
                </p>
                
                <p>
                  Mi enfoque integral te permite no solo transformar tu relación con la comida, 
                  sino también fortalecer tu mente y reconectar con tu verdadero yo.
                </p>
              </div>
            </div>
            
            {/* Credentials/Stats */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-wellness-green">500+</div>
                <div className="text-sm text-muted-foreground">Mujeres transformadas</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-wellness-green">8+</div>
                <div className="text-sm text-muted-foreground">Años de experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
