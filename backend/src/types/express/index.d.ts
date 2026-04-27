import mongoose, {Type} from "mongoose"

declare global {
    namespace Express {
        interface Request {
            userId: mongoose.Types.ObjectId,
        }
    }
}