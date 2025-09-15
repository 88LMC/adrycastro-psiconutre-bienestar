import { useState } from 'react';
import { useContent } from '@/hooks/useContent';
import AdminAuth from '@/components/AdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Save, Eye, Download } from 'lucide-react';

const AdminContent = () => {
  const { content } = useContent();
  const [editedContent, setEditedContent] = useState(content);
  const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'programs'>('hero');

  const handleSave = () => {
    const dataStr = JSON.stringify(editedContent, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('¡Archivo descargado! Sube este archivo a GitHub para actualizar el sitio.');
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const updateSection = (section: keyof typeof editedContent, field: string, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administrar Contenido</h1>
          <div className="flex gap-4">
            <Button onClick={handlePreview} variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Vista Previa
            </Button>
            <Button onClick={handleSave} className="bg-wellness-green hover:bg-wellness-green/90">
              <Download className="w-4 h-4 mr-2" />
              Descargar Cambios
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          {[
            { key: 'hero', label: 'Página Principal' },
            { key: 'about', label: 'Sobre Mí' },
            { key: 'programs', label: 'Libros' }
          ].map(section => (
            <Button
              key={section.key}
              variant={activeSection === section.key ? 'default' : 'outline'}
              onClick={() => setActiveSection(section.key as any)}
              className={activeSection === section.key ? 'bg-wellness-green' : ''}
            >
              {section.label}
            </Button>
          ))}
        </div>

        {activeSection === 'hero' && (
          <Card>
            <CardHeader>
              <CardTitle>Página Principal (Hero)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-sm font-medium mb-2">Título Principal</div>
                <Textarea
                  value={editedContent.hero.title}
                  onChange={(e) => updateSection('hero', 'title', e.target.value)}
                  rows={2}
                />
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Descripción</div>
                <Textarea
                  value={editedContent.hero.subtitle}
                  onChange={(e) => updateSection('hero', 'subtitle', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium mb-2">Botón Principal</div>
                  <Input
                    value={editedContent.hero.primaryButton}
                    onChange={(e) => updateSection('hero', 'primaryButton', e.target.value)}
                  />
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Botón Secundario</div>
                  <Input
                    value={editedContent.hero.secondaryButton}
                    onChange={(e) => updateSection('hero', 'secondaryButton', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'about' && (
          <Card>
            <CardHeader>
              <CardTitle>Sección Sobre Mí</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-sm font-medium mb-2">Título</div>
                <Input
                  value={editedContent.about.title}
                  onChange={(e) => updateSection('about', 'title', e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Primer Párrafo</div>
                <Textarea
                  value={editedContent.about.description1}
                  onChange={(e) => updateSection('about', 'description1', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Segundo Párrafo</div>
                <Textarea
                  value={editedContent.about.description2}
                  onChange={(e) => updateSection('about', 'description2', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium mb-2">Estadística 1</div>
                  <Input
                    value={editedContent.about.stat1}
                    onChange={(e) => updateSection('about', 'stat1', e.target.value)}
                  />
                  <Input
                    value={editedContent.about.stat1Label}
                    onChange={(e) => updateSection('about', 'stat1Label', e.target.value)}
                    className="mt-2"
                    placeholder="Descripción de la estadística"
                  />
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Estadística 2</div>
                  <Input
                    value={editedContent.about.stat2}
                    onChange={(e) => updateSection('about', 'stat2', e.target.value)}
                  />
                  <Input
                    value={editedContent.about.stat2Label}
                    onChange={(e) => updateSection('about', 'stat2Label', e.target.value)}
                    className="mt-2"
                    placeholder="Descripción de la estadística"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'programs' && (
          <Card>
            <CardHeader>
              <CardTitle>Sección de Libros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-sm font-medium mb-2">Título</div>
                <Input
                  value={editedContent.programs.title}
                  onChange={(e) => updateSection('programs', 'title', e.target.value)}
                />
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Descripción</div>
                <Textarea
                  value={editedContent.programs.subtitle}
                  onChange={(e) => updateSection('programs', 'subtitle', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Lead Magnet (Guía Gratuita)</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Título del Lead Magnet</div>
                    <Input
                      value={editedContent.programs.leadMagnet.title}
                      onChange={(e) => updateSection('programs', 'leadMagnet', {
                        ...editedContent.programs.leadMagnet,
                        title: e.target.value
                      })}
                    />
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">Descripción</div>
                    <Textarea
                      value={editedContent.programs.leadMagnet.description}
                      onChange={(e) => updateSection('programs', 'leadMagnet', {
                        ...editedContent.programs.leadMagnet,
                        description: e.target.value
                      })}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">📋 Instrucciones</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <ol className="list-decimal list-inside space-y-2">
              <li>Edita el contenido que quieras cambiar</li>
              <li>Haz click en "Vista Previa" para ver cómo se ve</li>
              <li>Cuando estés satisfecha, haz click en "Descargar Cambios"</li>
              <li>Sube el archivo descargado a GitHub (carpeta src/data/content.json)</li>
              <li>¡El sitio se actualizará automáticamente!</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Admin = () => {
  return (
    <AdminAuth>
      <AdminContent />
    </AdminAuth>
  );
};

export default Admin;
