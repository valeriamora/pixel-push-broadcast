import { useState } from "react";
import { Images, Disc3, Timer, RefreshCw } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { syncService, ComponentType } from "@/services/syncService";
import { toast } from "sonner";

const menuItems = [
  { title: "Carrusel", value: "carrusel" as ComponentType, icon: Images },
  { title: "Ruleta", value: "ruleta" as ComponentType, icon: Disc3 },
  { title: "Pomodoro", value: "pomodoro" as ComponentType, icon: Timer },
];

export function AdminSidebar() {
  const [activeComponent, setActiveComponent] = useState<ComponentType>(
    syncService.getState().activeComponent
  );

  const handleComponentSelect = (component: ComponentType) => {
    setActiveComponent(component);
    syncService.setComponent(component);
    toast.success(`Componente ${component} activado`, {
      description: "Todas las pantallas live se actualizarán automáticamente",
    });
  };

  const handleUpdate = () => {
    syncService.incrementVersion();
    toast.success("Versión actualizada", {
      description: "Todas las pantallas live se recargarán automáticamente",
    });
  };

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <h2 className="text-xl font-bold text-sidebar-foreground">
          Panel de Control
        </h2>
        <p className="text-sm text-sidebar-accent-foreground">
          Sistema de Presentación
        </p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-accent-foreground">
            Componentes
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => handleComponentSelect(item.value)}
                    isActive={activeComponent === item.value}
                    className="w-full"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-accent-foreground">
            Sistema
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Button
              onClick={handleUpdate}
              variant="outline"
              className="w-full justify-start gap-2 bg-sidebar-accent hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
            >
              <RefreshCw className="h-5 w-5" />
              Actualizar
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
