import { useMutation, useQueryClient } from "@tanstack/react-query";
import {updatePet} from "@api/pets";
import type {Pet} from "@entities/pet/pet.types.ts";

export const useUpdatePet = (options?: {
    onSuccess?: (pet: Pet) => void;
    onError?: (err: Error) => void;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Pet) => updatePet(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["pets"] });
            options?.onSuccess?.(data);
        },
        onError: (err) => {
            options?.onError?.(err as Error);
        },
    });
};
