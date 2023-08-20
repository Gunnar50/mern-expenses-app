import crypto from "crypto";
import { RoomModel } from "../models/Rooms.js";

export async function generateUniqueCode() {
    let code;

    while (true) {
        code = crypto.randomBytes(3).toString('hex').toUpperCase();
        const count = await RoomModel.countDocuments({ code: code });

        if (count === 0) {
            break;
        }
    }

    return code;
}
