import type {Pet} from "@entities/pet/pet.types.ts";
import {API_URL} from "@api/configures.ts";

export interface CreatePetDto extends Omit<Pet, "id"> {}

export const createPet = async (pet: CreatePetDto): Promise<Pet> => {
    const response = await fetch(`${API_URL}/pets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pet),
    });

    if (!response.ok) {
        throw new Error("Не удалось создать питомца!");
    }

    return await response.json();
};