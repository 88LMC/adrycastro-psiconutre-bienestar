import { Brain, Leaf, Zap } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Fortalece tu autoestima",
    description: "Desarrolla una relación sana contigo misma y recupera la confianza en tu cuerpo"
  },
  {
    icon: Leaf,
    title: "Alimenta tu cuerpo con consciencia",
    description: "Aprende a nutrir tu cuerpo de manera intuitiva y sin restricciones extremas"
  },
  {
    icon: Zap,
    title: "Vive con energía y equilibrio",
    description: "Encuentra el balance perfecto entre bienestar físico, mental y emocional"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            ¿Qué vas a <span className="text-wellness-green">lograr?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una transformación integral que va más allá de los números en la báscula
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            
            return (
              <div key={index} className="text-center space-y-6 group">
                <div className="mx-auto w-20 h-20 bg-wellness-green/10 rounded-3xl flex items-center justify-center group-hover:bg-wellness-green/20 transition-wellness">
                  <IconComponent className="w-10 h-10 text-wellness-green" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;