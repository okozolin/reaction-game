export interface InputProps {
    $error?: boolean;
}

export interface NewUser {
    name: string;
    length?: never;
}

export interface User extends NewUser {
    id: number
}
