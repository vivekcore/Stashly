import { useContext } from "react";
import { SessionContext } from "./SessionContext";

export function useSessionContext() {
  const ctx = useContext(SessionContext);
  if (!ctx)
    throw new Error("useSessionContext must be used inside SessionProvider");
  return ctx;
}
