import { Navigate, NavLink, Outlet, useLocation } from "react-router";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Button } from "@/components/ui/button";
import { AddContentDialog } from "@/features/content/add-content-dialog";
import { LogoutDialog } from "@/features/logout/logout-dialog";
import { getToken } from "@/lib/session";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { to: "/home/dashboard", label: "Dashboard" },
  { to: "/home/youtube", label: "Youtube" },
  { to: "/home/twitter", label: "Twitter" },
  { to: "/home/linkedin", label: "LinkedIn" },
  { to: "/home/text-editor", label: "Editor" },
];

export function ProtectedLayout() {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppHeader />

          <div className="border-b border-border/60 px-4 py-2 lg:hidden">
            <div className="flex items-center gap-2 overflow-x-auto">
              {mobileNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "shrink-0 rounded-full px-3 py-1 text-sm font-medium",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button
                variant="outline"
                className="ml-auto shrink-0"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Top
              </Button>
            </div>
          </div>

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
