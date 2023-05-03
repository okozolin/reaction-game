export interface InputProps {
    $error?: boolean;
}

export interface NewUser {
    userName: string;
    length?: never;
}

export interface User extends NewUser {
    id: number
}

export interface StateProps {
    feedback: string;
    onCountdownComplete: (result: boolean) => void;
}
export interface FeedbackProps {
    feedback: string;
}