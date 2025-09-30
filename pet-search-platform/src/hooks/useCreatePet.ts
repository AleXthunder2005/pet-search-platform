import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { createPet, type CreatePetDto } from "@api/pets";
import type { Pet } from "@entities/pet/pet.types.ts";

export const useCreatePet = (
    options?: Omit<UseMutationOptions<Pet, Error, CreatePetDto>, "mutationFn">
) => {
    return useMutation<Pet, Error, CreatePetDto>({
        mutationFn: createPet,
        ...options,
    });
};
