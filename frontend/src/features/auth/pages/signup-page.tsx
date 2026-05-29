import { useState, useEffect } from "react";
import { AuthForm } from "../components/auth-form";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";

const SignUp = () => {

  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [error, setError] = useState<string>();
  const [emailSent, setEmailSent] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const redirectTo = "/#/home/dashboard";
  const callbackURL = `${window.location.origin}${redirectTo}`;

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { error } = await authClient.signUp.email(
      {
        name,
        email,
        password,
        callbackURL,
        
      },
      {
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          setError(ctx.error.message);
        },
      },
    );
    if (error) {
      if (error.code === "USER_ALREADY_EXISTS") {
        setError("This email is already registered. Please login instead.");
      } else {
        setError(error.message); // fallback for other errors
      }
      return;
    }
    setEmailSent(true);
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
        mode="signup"
        onSubmit={handleSubmit}
        onSocial={handleSocial}
        isLoading={isLoading}
      />
    </>
  );
};

export default SignUp;
