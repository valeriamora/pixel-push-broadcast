import { useEffect, useState } from "react";
import { syncService, ComponentType } from "@/services/syncService";
import { CarruselComponent } from "./components/CarruselComponent";
import { RuletaComponent } from "./components/RuletaComponent";
import { PomodoroComponent } from "./components/PomodoroComponent";

export function ComponentDisplay() {
  const [activeComponent, setActiveComponent] = useState<ComponentType>(
    syncService.getState().activeComponent
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(syncService.getVersion());

  useEffect(() => {
    // Subscribe to sync service updates
    const unsubscribe = syncService.subscribe((state) => {
      // Check if version changed and force reload
      if (state.version !== currentVersion) {
        setCurrentVersion(state.version);
        if ((state as any).forceReload) {
          window.location.reload();
          return;
        }
      }

      // Handle component change with transition
      if (state.activeComponent !== activeComponent) {
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveComponent(state.activeComponent);
          setIsTransitioning(false);
        }, 300);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [activeComponent, currentVersion]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "carrusel":
        return <CarruselComponent />;
      case "ruleta":
        return <RuletaComponent />;
      case "pomodoro":
        return <PomodoroComponent />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground/80 mb-2">
                Sistema de Presentación
              </h2>
              <p className="text-muted-foreground">
                Esperando selección desde el panel de administración
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`h-full transition-opacity duration-300 ${
        isTransitioning ? "opacity-0 component-exit" : "opacity-100 component-enter"
      }`}
    >
      {renderComponent()}
    </div>
  );
}
