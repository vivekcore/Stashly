import { Navigate, Outlet, useLocation } from "react-router";

import { AppHeader } from "@/features/shell/components/app-header";
import { AppSidebar } from "@/features/shell/components/app-sidebar";

import { AddContentDialog } from "@/features/content/components/add-content-dialog";
import { LogoutDialog } from "@/features/auth/components/logout-dialog";
import { getToken } from "@/shared/lib/session";

export function ProtectedLayout() {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppHeader />
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <AddContentDialog />
      <LogoutDialog />
    </div>
  );
}

