import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/useContent";
import adryPhoto from "@/assets/adry-politica-2.jpeg";

const AboutSection = () => {
  const { content } = useContent();
  const aboutContent = content.about;

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section id="sobre-mi" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Photo */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-wellness max-w-md mx-auto">
              <img 
                src={adryPhoto} 
                alt="Adry Castro - Psiconutricionista especializada en mujeres 40+ con lipedema y perimenopausia"
                className="w-full h-full object-cover"
                loading="lazy"
                width="400"
                height="400"
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
                {aboutContent.title}
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                <p>{aboutContent.description1}</p>
                <p>{aboutContent.description2}</p>
              </div>
            </div>
            
            {/* Credentials/Stats */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-wellness-green">{aboutContent.stat1}</div>
                <div className="text-sm text-muted-foreground">{aboutContent.stat1Label}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-wellness-green">{aboutContent.stat2}</div>
                <div className="text-sm text-muted-foreground">{aboutContent.stat2Label}</div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="pt-4">
              <Button 
                onClick={() => scrollToSection('contacto')}
                variant="default"
                size="lg"
                className="bg-wellness-green hover:bg-wellness-green-light text-white"
                aria-label="Contactar con Adry Castro para consulta de psiconutrición"
              >
                {aboutContent.ctaButton}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
