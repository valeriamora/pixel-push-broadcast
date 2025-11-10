import { Construction } from "lucide-react";

export function CarruselComponent() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-primary-glow/10 backdrop-blur-sm rounded-2xl border border-primary/20">
      <div className="text-center space-y-4 p-8">
        <Construction className="h-16 w-16 text-primary mx-auto animate-pulse" />
        <h2 className="text-4xl font-bold text-foreground">Carrusel</h2>
        <div className="inline-block px-6 py-2 bg-primary/20 rounded-full border border-primary/30">
          <p className="text-lg text-primary font-semibold">En Construcción</p>
        </div>
        <p className="text-muted-foreground max-w-md">
          Este componente está siendo desarrollado. Pronto estará disponible con
          funcionalidad completa de carrusel de imágenes.
        </p>
      </div>
    </div>
  );
}
