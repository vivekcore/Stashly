import { useState } from "react";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { toggle } from "@/features/auth/store/logout-alert-slice";
import { clearUsername } from "@/features/auth/store/user-slice";

export function LogoutDialog() {
  const isOpen = useAppSelector((state) => state.logoutAlert.isOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isOpen) {
    return null;
  }

  const close = () => dispatch(toggle());

  const confirm = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut();
      dispatch(clearUsername());
      dispatch(toggle());
      navigate("/auth", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 p-4 backdrop-blur-md transition-all duration-300">
      <Card className="relative overflow-hidden w-full max-w-sm rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-neutral-900/40 shadow-2xl backdrop-blur-xl transition-all duration-300">
        {/* Soft decorative ambient glow inside dialog */}
        <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-destructive/10 blur-xl pointer-events-none" />

        <CardHeader className="space-y-1.5 pb-4">
          <CardTitle className="text-xl font-bold tracking-tight">Log Out</CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-normal">
            This will end your session and return you to the sign-in screen.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-sm text-muted-foreground/90">
            Are you sure you want to log out of Stashly?
          </p>
        </CardContent>
        <CardFooter className="justify-end gap-2 pt-2 pb-5">
          <Button
            variant="outline"
            className="rounded-xl px-4 py-2 border-border/80 bg-background/80 hover:bg-muted font-medium transition-all cursor-pointer active:scale-95"
            onClick={close}
            disabled={isLoggingOut}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="rounded-xl px-4 py-2 font-medium transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
            onClick={confirm}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
