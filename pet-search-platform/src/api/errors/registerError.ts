export type RegisterErrorType = "network" | "emailIsAlreadyExists";

export class RegisterError extends Error {
    type: RegisterErrorType;

    constructor(type: RegisterErrorType, message: string) {
        super(message);
        this.type = type;
        this.name = "LoginError";
    }
}
