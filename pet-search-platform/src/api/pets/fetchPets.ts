import type { Pet } from "@entities/pet/pet.types.ts";
import { API_URL } from "../configures.ts";

export const fetchPetById = async (id: number): Promise<Pet> => {
    const response = await fetch(`${API_URL}/pets/${id}`);
    if (!response.ok) {
        throw new Error("Не удалось прочитать данные питомца!");
    }
    return await response.json();
};

export const fetchAllPets = async (): Promise<Pet[]> => {
    const response = await fetch(`${API_URL}/pets`);
    if (!response.ok) {
        throw new Error("Не удалось загрузить список питомцев!");
    }
    return await response.json();
};

export const fetchPetsByPersonId = async (personId: number): Promise<Pet[]> => {
    const response = await fetch(`${API_URL}/pets?personId=${personId}`);
    if (!response.ok) {
        throw new Error("Не удалось загрузить список ваших питомцев!");
    }
    return await response.json();
};