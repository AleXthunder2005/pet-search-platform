import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Person } from "@entities/person/person.types.ts";
import { updatePerson } from "@api/people/updatePerson.ts";

export const useUpdatePerson = (options?: {
    onSuccess?: (person: Person) => void;
    onError?: (err: Error) => void;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Person) => updatePerson(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["person", data.id] });
            options?.onSuccess?.(data);
        },
        onError: (err) => {
            options?.onError?.(err as Error);
        },
    });
};
