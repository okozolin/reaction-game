import  { v1 as uuidv1 } from "uuid"

export function generateUserId() {
    return uuidv1();
}