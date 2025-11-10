import { Construction } from "lucide-react";

export function PomodoroComponent() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-destructive/10 to-destructive/5 backdrop-blur-sm rounded-2xl border border-destructive/20">
      <div className="text-center space-y-4 p-8">
        <Construction className="h-16 w-16 text-destructive mx-auto animate-pulse" />
        <h2 className="text-4xl font-bold text-foreground">Pomodoro</h2>
        <div className="inline-block px-6 py-2 bg-destructive/20 rounded-full border border-destructive/30">
          <p className="text-lg text-destructive font-semibold">En Construcción</p>
        </div>
        <p className="text-muted-foreground max-w-md">
          Este componente está siendo desarrollado. Pronto estará disponible con
          funcionalidad completa de temporizador Pomodoro.
        </p>
      </div>
    </div>
  );
}
