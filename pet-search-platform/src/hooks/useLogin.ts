import { useMutation } from "@tanstack/react-query";
import { login } from "@api/people";
import type { Person } from "@entities/person/person.types.ts";
import type { LoginError } from "@api/errors/loginError.ts";

export const useLogin = () => {
    return useMutation<Person, LoginError, { email: string; password: string }>({
        mutationFn: login,
    });
};
