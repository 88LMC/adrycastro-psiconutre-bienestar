import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = "Adry Castro - Psiconutrición para Mujeres 40+ | Transformación Integral",
  description = "Descubre el método único de psiconutrición de Adry Castro. Transforma tu relación con la comida y tu cuerpo después de los 40. Resultados reales, enfoque integral.",
  keywords = "psiconutrición, mujeres 40+, nutrición emocional, pérdida de peso, coaching nutricional, alimentación consciente, bienestar integral",
  image = "https://adrycastro.com/og-image.jpg",
  url = "https://adrycastro.com"
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Adry Castro" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
