import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { LoaderCircle } from "lucide-react";

import { useAppDispatch } from "@/app/store/hooks";
import { authClient } from "@/lib/auth-client";
import { AppHeader } from "@/features/shell/components/app-header";
import { AppSidebar } from "@/features/shell/components/app-sidebar";

import { AddContentDialog } from "@/features/content/components/add-content-dialog";
import { LogoutDialog } from "@/features/auth/components/logout-dialog";
import { setUsername } from "@/features/auth/store/user-slice";

export function ProtectedLayout() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session?.user) {
      dispatch(setUsername(session.user.name || session.user.email));
    }
  }, [dispatch, session?.user]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoaderCircle className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
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
