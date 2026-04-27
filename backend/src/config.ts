import dotenv from "dotenv"
dotenv.config();

interface ENV{
    DATABASE_URL:string,
    PORT: number,
    USER_SECRET_KEY:string,
}

function getConfig():ENV{
    const { DATABASE_URL, PORT, USER_SECRET_KEY } = process.env;

    if(!DATABASE_URL || !PORT || !USER_SECRET_KEY){
        throw new Error("Missing required environment variables");
    }

    return {
        DATABASE_URL,
        PORT: Number(PORT),
        USER_SECRET_KEY,
    }
}
export default getConfig;