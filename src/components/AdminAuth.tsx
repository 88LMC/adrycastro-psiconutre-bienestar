import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

interface AdminAuthProps {
  children: React.ReactNode;
}

const ADMIN_PASSWORD = 'Unagorditaamigajonadita2025'; // ← AQUÍ ESTÁ EL PASSWORD

const AdminAuth = ({ children }: AdminAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar si ya está autenticado en sessionStorage
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-auth', 'authenticated');
      setError('');
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin-auth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-wellness-green/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-wellness-green" />
            </div>
            <CardTitle className="text-2xl">Área Administrativa</CardTitle>
            <p className="text-gray-600">Ingresa la contraseña para continuar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-wellness-green hover:bg-wellness-green/90"
              >
                Acceder
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Header con logout */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">Panel Administrativo</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            Cerrar Sesión
          </Button>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default AdminAuth;
