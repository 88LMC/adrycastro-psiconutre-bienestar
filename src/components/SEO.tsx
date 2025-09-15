import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({ 
  title = "Adry Castro - Psiconutrición para Mujeres 40+ | Transformación Integral",
  description = "Descubre el método único de psiconutrición de Adry Castro. Transforma tu relación con la comida y tu cuerpo después de los 40. Resultados reales, enfoque integral.",
  keywords = "psiconutrición, mujeres 40+, nutrición emocional, pérdida de peso, coaching nutricional, alimentación consciente, bienestar integral",
  image = "https://adrycastro.com/og-image.jpg",
  url = "https://adrycastro.com",
  type = "website"
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Adry Castro" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Adry Castro - Psiconutrición" />
      <meta property="og:locale" content="es_CR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@adrycastro" />
      
      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="theme-color" content="#22c55e" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
    </Helmet>
  );
};

export default SEO;
