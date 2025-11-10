import { Construction } from "lucide-react";

export function RuletaComponent() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm rounded-2xl border border-accent/20">
      <div className="text-center space-y-4 p-8">
        <Construction className="h-16 w-16 text-accent mx-auto animate-pulse" />
        <h2 className="text-4xl font-bold text-foreground">Ruleta</h2>
        <div className="inline-block px-6 py-2 bg-accent/20 rounded-full border border-accent/30">
          <p className="text-lg text-accent font-semibold">En Construcción</p>
        </div>
        <p className="text-muted-foreground max-w-md">
          Este componente está siendo desarrollado. Pronto estará disponible con
          funcionalidad completa de ruleta interactiva.
        </p>
      </div>
    </div>
  );
}
