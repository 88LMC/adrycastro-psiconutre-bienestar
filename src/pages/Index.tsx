import SEO from "../components/SEO";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <SEO 
        title="Adry Castro - Psiconutrición para Mujeres 40+ | Transformación Integral"
        description="Descubre el método único de psiconutrición de Adry Castro. Transforma tu relación con la comida y tu cuerpo después de los 40. Resultados reales, enfoque integral."
        keywords="psiconutrición, mujeres 40+, nutrición emocional, pérdida de peso, coaching nutricional, alimentación consciente, bienestar integral"
        url="https://adrycastro.com"
      />
      <Header />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default Index;
