import { validate } from "uuid";

export const checkUuid = (id: string) => {
    return validate(id);
}