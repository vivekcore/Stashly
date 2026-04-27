import { type FormEvent, useState } from "react";
import { Button } from "../ui/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { DATABASE_URL } from "../../config";
import { useAppDispatch } from "../../app/hooks";
import { setUsername, clearUsername } from "../../features/UserSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Username, serUser] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log(Username, password, email);
      const response = await axios.post(`${DATABASE_URL}/user/signup`, {
        Username: Username,
        password: password,
        email: email, // spelling fixed
      });

      //dispatch(serUser())

      console.log("signed up", response);
      if (response.status === 200) {
        navigate("/home/dashboard");
        localStorage.removeItem('token');
        localStorage.setItem('token',response.data.token)
        dispatch(clearUsername());
        dispatch(setUsername(Username));
      }
      // if (switchToSignIn) {
      //   switchToSignIn();
      // }
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
        <h2 className="text-foreground mb-4 text-2xl">Sign Up</h2>

        {error && (
          <p className="mb-2 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <div className="mb-3">
          <label
            className="text-foreground mb-1 block text-sm"
            htmlFor="Username"
          >
            Username
          </label>
          <input
            id="Username"
            type="text"
            required
            value={Username}
            onChange={(e) => serUser(e.target.value)}
            className="text-foreground bg-background w-full rounded border px-2 py-1"
          />
        </div>

        <div className="mb-3">
          <label className="text-foreground mb-1 block text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Button varient="primary" size="md" className="w-full">
          {loading ? "Signing up…" : "Sign Up"}
        </Button>

        <p className="text-foreground mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={"/signin"} className="text-accent underline">
            SignIn
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
