import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const Admin = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-bg">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Panel de Administración
              </h1>
              <p className="text-muted-foreground text-lg">
                Controla en tiempo real qué componente se muestra en todas las
                pantallas live conectadas
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-card rounded-xl p-6 shadow-elegant border border-border">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  Estado del Sistema
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="text-foreground font-medium">
                      Sistema de Sincronización
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm">
                      <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-green-600 font-semibold">Activo</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="text-foreground font-medium">
                      Método de Comunicación
                    </span>
                    <span className="text-muted-foreground">
                      BroadcastChannel API + LocalStorage
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-elegant border border-border">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  Instrucciones
                </h2>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    <span>
                      Selecciona un componente del menú lateral para activarlo
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    <span>
                      Todas las pantallas live abiertas se actualizarán
                      automáticamente
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    <span>
                      Usa el botón "Actualizar" para forzar la recarga de todas
                      las pantallas
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
