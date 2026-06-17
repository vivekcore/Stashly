import { authClient } from "@/lib/auth-client";
import { SessionContext } from "./SessionContext";
import type React from "react";

export function SessionProvider({children}:{children:React.ReactNode}) {

    const {data:session, isPending,error} = authClient.useSession()

    return(
        <SessionContext.Provider value={{session,isPending,error}}>
            {children}
        </SessionContext.Provider>
    )
}

