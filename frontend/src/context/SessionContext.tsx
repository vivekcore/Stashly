import { authClient } from "@/lib/auth-client";
import { createContext } from "react";


export interface SessionContextType {
  session: typeof authClient.$Infer.Session | null;
  isPending: boolean;
  error: unknown;
};

export const SessionContext = createContext<SessionContextType | null>(null)
