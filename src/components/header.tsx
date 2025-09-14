import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="text-2xl font-bold text-wellness-green cursor-pointer"
            onClick={() => scrollToSection('inicio')}
          >
            Adry Castro
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="text-foreground hover:text-wellness-green transition-colors"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('libros')}
              className="text-foreground hover:text-wellness-green transition-colors"
            >
              Libros
            </button>
            <button 
              onClick={() => scrollToSection('sobre-mi')}
              className="text-foreground hover:text-wellness-green transition-colors"
            >
              Sobre Mí
            </button>
            <button 
              onClick={() => scrollToSection('testimonios')}
              className="text-foreground hover:text-wellness-green transition-colors"
            >
              Testimonios
            </button>
            <button 
              onClick={() => scrollToSection('contacto')}
              className="text-foreground hover:text-wellness-green transition-colors"
            >
              Contacto
            </button>
          </nav>

          <button className="md:hidden text-foreground">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
