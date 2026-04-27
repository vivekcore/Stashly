import {
  BrainCircuit,
  FileText,
  LayoutDashboard,
  Linkedin,
  LogOut,
  Twitter,
  User2,
  Youtube,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { toggle } from "@/features/AlertSlice";
import { cn } from "@/lib/utils";

const navigationItems = [
  { to: "/home/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/home/youtube", label: "Youtube", icon: Youtube },
  { to: "/home/twitter", label: "Twitter", icon: Twitter },
  { to: "/home/linkedin", label: "LinkedIn", icon: Linkedin },
  { to: "/home/text-editor", label: "Text editor", icon: FileText },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username) || "Guest";

  return (
    <aside className="hidden w-72 shrink-0 border-r border-border/60 bg-card/70 backdrop-blur lg:flex lg:flex-col">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-3 border-b border-border/60 px-6 py-6 text-left"
      >
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <BrainCircuit size={28} />
        </div>
        <div>
          <p className="text-lg font-semibold tracking-tight">Stashly</p>
          <p className="text-sm text-muted-foreground">Save and organize content</p>
        </div>
      </button>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {navigationItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border/60 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-background/80 p-4">
          <div className="rounded-full bg-secondary p-2 text-secondary-foreground">
            <User2 size={18} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{username}</p>
            <p className="text-xs text-muted-foreground">Signed in</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => dispatch(toggle())}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </aside>
  );
}
