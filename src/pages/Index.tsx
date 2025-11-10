import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings, Monitor } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-bg">
      <div className="text-center space-y-8 max-w-3xl mx-auto p-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Sistema de Presentación en Tiempo Real
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Control centralizado y sincronización instantánea entre múltiples pantallas
            utilizando tecnologías del navegador
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link to="/admin" className="block">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary/50">
              <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Panel de Administración
              </h2>
              <p className="text-muted-foreground mb-4">
                Controla qué componente se muestra en todas las pantallas live
              </p>
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                Acceder al Admin
              </Button>
            </div>
          </Link>

          <Link to="/live" className="block">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-accent/50">
              <Monitor className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Pantalla Live
              </h2>
              <p className="text-muted-foreground mb-4">
                Vista de presentación que se sincroniza automáticamente
              </p>
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                Abrir Pantalla Live
              </Button>
            </div>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-xl border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Características del Sistema
          </h3>
          <ul className="text-muted-foreground space-y-2 text-left max-w-xl mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Sincronización en tiempo real sin servidor backend</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>BroadcastChannel API + LocalStorage para comunicación entre pestañas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Sistema de versionado automático para actualizaciones</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Transiciones suaves entre componentes</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
