import type {Pet} from "@entities/pet/pet.types.ts";
import {useQuery, type UseQueryOptions} from "@tanstack/react-query";
import {fetchPetsByPersonId} from "@api/pets/fetchPets.ts";

export const useMyPets = (
    personId?: number,
    options?: Omit<UseQueryOptions<Pet[]>, "queryKey" | "queryFn">
) => {
    return useQuery<Pet[]>({
        queryKey: ["myPets", personId],
        queryFn: () => fetchPetsByPersonId(personId!),
        enabled: !!personId,
        staleTime: 1000 * 60 * 5,
        ...options,
    });
};