import { type FormEvent, useState } from "react";
import { Button } from "../ui/Button";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { DATABASE_URL } from "../../config";
import { useAppDispatch } from "../../app/hooks";
import { clearUsername, setUsername } from "../../features/UserSlice";

// export interface SignInProps {
//   /**
//    * Optional callback that will be invoked when the user wants to
//    * switch to the sign‑up view.  The parent component can pass a
//    * handler that toggles between `SignIn`/`SignUp` if it keeps both
//    * components around.
//    */
//   switchToSignUp?: () => void;
// }

const SignIn = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${DATABASE_URL}/user/signin`, {
        Username: userName,
        password,
      });

      // const UserName =  response.config.data.username;

      if (response.status === 200) {
        dispatch(clearUsername());
        dispatch(setUsername(userName));
        localStorage.setItem("token", response.data.token);
        navigate("/home/dashboard");
      }
      // store token locally; the app can read this later to set auth state
      // TODO: dispatch redux action or call a hook to update authenticated user
      // For now we just log
      console.log("signed in", response);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-background border-muted w-full max-w-sm rounded-lg border p-6 shadow-md"
      >
        <h2 className="text-foreground mb-4 text-2xl">Sign In</h2>

        {error && (
          <p className="mb-2 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <div className="mb-3">
          <label
            className="text-foreground mb-1 block text-sm"
            htmlFor="userName"
          >
            Username
          </label>
          <input
            id="userName"
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="text-foreground bg-background w-full rounded border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label
            className="text-foreground mb-1 block text-sm"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-foreground bg-background w-full rounded border px-2 py-1"
          />
        </div>

        <Button
          varient="primary"
          size="md"
          className="w-full"
          onclick={() => {}}
        >
          {loading ? "Signing in…" : "Sign In"}
        </Button>

        <p className="text-foreground mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-accent underline">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
