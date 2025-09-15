import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adry Castro",
    "jobTitle": "Psiconutricionista",
    "description": "Especialista en psiconutrición para mujeres después de los 40 años, lipedema y perimenopausia",
    "url": "https://adrycastro.com",
    "image": "https://adrycastro.com/adry-castro-photo.jpg",
    "sameAs": [
      "https://instagram.com/adrycastro",
      "https://facebook.com/adrycastro"
    ],
    "knowsAbout": [
      "Psiconutrición",
      "Lipedema",
      "Perimenopausia",
      "Nutrición para mujeres 40+",
      "Bienestar integral"
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Costa Rica"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Adry Castro - Psiconutrición",
    "url": "https://adrycastro.com",
    "description": "Psiconutrición especializada para mujeres después de los 40 años",
    "publisher": {
      "@type": "Person",
      "name": "Adry Castro"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Psiconutrición para Mujeres 40+",
    "description": "Servicios especializados en psiconutrición para mujeres después de los 40, incluyendo manejo de lipedema y perimenopausia",
    "provider": {
      "@type": "Person",
      "name": "Adry Castro"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Costa Rica"
    },
    "serviceType": "Psiconutrición",
    "audience": {
      "@type": "Audience",
      "audienceType": "Mujeres después de los 40 años"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
