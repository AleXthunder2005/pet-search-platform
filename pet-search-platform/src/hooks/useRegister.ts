import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Person } from "@entities/person/person.types.ts";
import {createPerson} from "@api/people/register.ts";
import {md5Hash} from "@utils/md5Hash.ts";
import type {RegisterError} from "@api/errors/registerError.ts";

interface RegisterProps {
    email: string;
    password: string;
}

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation<Person, RegisterError, RegisterProps>({
        mutationFn: (payload) => createPerson(
            {
                email: payload.email,
                passwordHash: md5Hash(payload.password),
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["people"] });
        },
    });
};
