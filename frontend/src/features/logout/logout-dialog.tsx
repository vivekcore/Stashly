import { useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toggle } from "@/features/AlertSlice";
import { clearUsername } from "@/features/UserSlice";
import { clearSession } from "@/lib/session";

export function LogoutDialog() {
  const isOpen = useAppSelector((state) => state.logoutAlert.isOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const close = () => dispatch(toggle());

  const confirm = () => {
    clearSession();
    dispatch(clearUsername());
    dispatch(toggle());
    navigate("/signin", { replace: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log out</CardTitle>
          <CardDescription>
            This will clear your local session and return you to the sign-in page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Do you want to continue?</p>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirm}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
