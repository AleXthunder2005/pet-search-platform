export type LoginErrorType = "network" | "userNotFound" | "invalidPassword";

export class LoginError extends Error {
    type: LoginErrorType;

    constructor(type: LoginErrorType, message: string) {
        super(message);
        this.type = type;
        this.name = "LoginError";
    }
}
