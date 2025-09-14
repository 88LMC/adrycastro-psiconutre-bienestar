import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Sparkles, Flower } from "lucide-react";

const programs = [
  {
  id: "lipedema",
  title: "Psiconutrición para el Lipedema", 
  description: "La guía completa para entender y manejar el lipedema desde un enfoque integral. Incluye plan de alimentación, estrategias psicológicas y ejercicios específicos.",
  icon: Heart,
  regularPrice: "$49 USD",
  price: "$27 USD", 
  status: "available",
  statusText: "PROMOCIÓN LANZAMIENTO",
  cta: "Comprar Ahora",
  features: [
    "Protocolo antiinflamatorio personalizado",
    "Técnicas de autocompasión y autoestima",
    "Plan de ejercicios específicos para lipedema", 
    "Comunidad de apoyo exclusiva",
    "Garantía de 30 días"
  ],
  highlights: [
    "✅ Descarga inmediata",
    "✅ Formato PDF + Audio",
    "✅ Acceso de por vida"
  ]
},
  {
    id: "mujeres-40",
    title: "Psiconutrición para Mujeres Latinas de 40+",
    description: "Recupera tu energía, confianza y equilibrio en esta nueva etapa.",
    icon: Sparkles,
    cta: "Descúbrelo ahora",
    features: [
      "Nutrición para el metabolismo después de los 40",
      "Gestión del estrés y las emociones",
      "Herramientas para el empoderamiento personal"
    ]
  },
  {
    id: "perimenopausia",
    title: "Psiconutrición para la Perimenopausia",
    description: "Equilibra tus hormonas, mejora tu estado de ánimo y vive plena.",
    icon: Flower,
    cta: "Empieza hoy",
    features: [
      "Alimentación para equilibrio hormonal",
      "Manejo de síntomas emocionales",
      "Estrategias de bienestar integral"
    ]
  }
];

const ProgramsSection = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
  return (
    <section id="libros" className="py-20 bg-wellness-beige-light">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Programas <span className="text-wellness-green">Digitales</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transformaciones diseñadas específicamente para las necesidades únicas de cada mujer
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((program) => {
            const IconComponent = program.icon;
            
            return (
              <Card key={program.id} className="border-0 shadow-wellness bg-card hover:shadow-xl transition-wellness group">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-wellness-green/10 rounded-2xl flex items-center justify-center group-hover:bg-wellness-green/20 transition-wellness">
                    <IconComponent className="w-8 h-8 text-wellness-green" />
                  </div>
                  
                  <CardTitle className="text-xl font-semibold text-foreground leading-tight">
                    {program.title}
                  </CardTitle>
                  
                  <CardDescription className="text-base text-muted-foreground">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-wellness-green rounded-full mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="wellness" className="w-full">
                    {program.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
