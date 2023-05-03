import {MAX_USER_NAME_LENGTH} from "../constants/sizes";

export const UserNameInvalidCharsRegEx = RegExp('^[a-zA-Z0-9-_]+$');

export const isNameFieldInvalid = (userName: string): boolean => {
    const isNameInvalid = (userName && !UserNameInvalidCharsRegEx.test(userName?.trim())) ?? false;
    const isNameTooLong = (userName?.length ?? 0) > MAX_USER_NAME_LENGTH;
    const isNameEmpty = userName.trim() === "";
    return isNameEmpty || isNameInvalid || isNameTooLong;
}