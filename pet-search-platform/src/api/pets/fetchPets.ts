import type {Pet} from "@entities/pet/pet.types.ts";

import {API_URL} from '../configures.ts'

export const fetchPetById = async (id: string): Promise<Pet> => {
    const response = await fetch(`${API_URL}/pets/${id}`);

    if (!response.ok) {
        throw new Error("Не удалось прочитать данные питомца!");
    }

    return await response.json();
};