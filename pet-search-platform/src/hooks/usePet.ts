import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { fetchPetById } from "@api/pets";
import type { Pet } from "@entities/pet/pet.types.ts";

export const usePet = (
    id?: number,
    options?: Omit<UseQueryOptions<Pet>, "queryKey" | "queryFn">
) => {
    return useQuery<Pet>({
        queryKey: ["pet", id],
        queryFn: () => fetchPetById(id!),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        ...options,
    });
};
