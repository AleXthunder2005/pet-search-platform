import {deletePet} from "@api/pets/deletePets.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useDeletePet = (options?: {
    onSuccess?: () => void;
    onError?: (err: Error) => void;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deletePet(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pets"] });
            options?.onSuccess?.();
        },
        onError: (err: any) => {
            options?.onError?.(err as Error);
        },
    });
};