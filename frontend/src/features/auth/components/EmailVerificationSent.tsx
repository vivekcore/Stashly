import { useState, useEffect } from "react";

import { Mail, CheckCircle2, Clock, Folder } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { authClient } from "@/lib/auth-client";
import { Link, useLocation, useNavigate } from "react-router";

export default function EmailVerification() {
  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
 const session = authClient.useSession();
 const navigate = useNavigate()
const location = useLocation();
  const locationState = location.state as {
    from?: { pathname?: string };
  } | null;
  const redirectTo = locationState?.from?.pathname ?? "/#/home/dashboard";
  const callbackURL = `${window.location.origin}${redirectTo}`;

  useEffect(() => {
    if(session.data?.user.emailVerified){
      navigate("/home/dashboard")
    }
  },[session.data?.user?.emailVerified,navigate])
 if(session.data?.user.emailVerified){
  navigate("/#/home/dashboard");
 }
 
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || sending) return;
    setSending(true);

   await authClient.sendVerificationEmail({
      email: session.data?.user.email as string,
      callbackURL,
    });

    setSending(false);
    setCooldown(60);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className=" flex items-center justify-center ">
      <Card className="w-full max-w-md shadow-sm">
        <CardContent className="pt-8 pb-8 px-8 text-center">

          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>

          {/* Heading */}
          <h1 className="text-xl font-semibold text-foreground mb-2">
            Check your inbox
          </h1>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            We&apos;ve sent a verification link to{" "}
            <span className="font-medium text-foreground">{session.data?.user.email}</span>
          </p>

          {/* Info box */}
          <div className="bg-muted rounded-lg p-4 mb-6 text-left space-y-3">
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Click the link in the email to verify your account
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <Clock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                The link expires in{" "}
                <span className="font-medium text-foreground">24 hours</span>
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <Folder className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Can&apos;t find it? Check your{" "}
                <span className="font-medium text-foreground">
                  spam or junk
                </span>{" "}
                folder
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={handleResend}
              disabled={cooldown > 0 || sending}
            >
              {sending
                ? "Sending..."
                : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend verification email"}
            </Button>
            <Button variant="outline" className="w-full">
              <Link to="/auth/signup">Use a different email</Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
            Didn&apos;t sign up? You can safely ignore this email.
          </p>
        </CardContent>
      </Card>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700 text-sm font-medium px-4 py-2.5 rounded-lg shadow-md">
          ✓ Verification email resent!
        </div>
      )}
    </div>
  );
}