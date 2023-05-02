import {MAX_USER_NAME_LENGTH} from "../constants/sizes";

export const UserNameInvalidCharsRegEx = RegExp('[.[\\]{} \\\\^$|?*+\\/!\':"<>=]');

export const isNameFieldInvalid = (userName: string | undefined): boolean => {
    const isNameInvalid = (userName && UserNameInvalidCharsRegEx.test(userName?.trim())) ?? false;
    const isNameTooLong = (userName?.length ?? 0) > MAX_USER_NAME_LENGTH;
    return !userName || isNameInvalid || isNameTooLong;
}