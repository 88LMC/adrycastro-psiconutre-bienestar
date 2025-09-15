// Image optimization utilities for better Core Web Vitals

export const getOptimizedImageProps = (
  src: string,
  alt: string,
  width?: number,
  height?: number,
  priority = false
) => {
  return {
    src,
    alt,
    width,
    height,
    loading: priority ? 'eager' : 'lazy' as 'eager' | 'lazy',
    decoding: 'async' as const,
    style: {
      maxWidth: '100%',
      height: 'auto'
    }
  };
};

// Preload critical images
export const preloadCriticalImages = () => {
  if (typeof window !== 'undefined') {
    const criticalImages = [
      '/src/assets/adry-1-fondo.jpeg', // Hero image
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
};
