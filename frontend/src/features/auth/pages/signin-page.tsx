import { authClient } from "@/lib/auth-client";
import { AuthForm } from "../components/auth-form";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
const SignIn = () => {

  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [error, setError] = useState<string>();
  const [emailSent, setEmailSent] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  
  const redirectTo =  "/#/home/dashboard";
  const callbackURL = `${window.location.origin}${redirectTo}`;
  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL,
        rememberMe:true,
      },
      {
        onResponse: () => {
           setIsLoading(false);
        },
        onError: (ctx) => {
          if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            setEmailSent(true);
          } else {
            setError(ctx.error.message);
          }
        },
      },
    );

    if (error && error.code === "EMAIL_NOT_VERIFIED") {
      setEmailSent(true);
    }
  }
  const handleSocial = async (id: string) => {
    setError(undefined);
    setActiveProvider(id);

    try {
      await authClient.signIn.social({
        provider: id,
        callbackURL,
      });
    } catch {
      setError("Authentication failed.");
      setActiveProvider(null);
    }
  };
  useEffect(() => {
    if (emailSent) {
      navigate("/auth/email-verify");
    }
  }, [emailSent, navigate]);

  return (
    <>
      <AuthForm
        error={error}
        activeProvider={activeProvider as string}
        mode="signin"
        onSubmit={handleSubmit}
        onSocial={handleSocial}
        isLoading={isLoading}
      />
    </>
  );
};

export default SignIn;

