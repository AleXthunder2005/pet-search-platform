import { useQuery } from "@tanstack/react-query";
import type { Pet } from "@entities/pet/pet.types.ts";
import {fetchAllPets} from "@api/pets/fetchPets.ts";

export const useAllPets = () => {
    return useQuery<Pet[]>({
        queryKey: ["allPets"],
        queryFn: fetchAllPets,
        staleTime: 1000 * 60 * 5,
    });
};