import type { Pet } from "@entities/pet/pet.types.ts";
import { API_URL } from "@api/configures.ts";

export const updatePet = async (pet: Pet): Promise<Pet> => {
    const response = await fetch(`${API_URL}/pets/${pet.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pet),
    });

    if (!response.ok) {
        throw new Error("Не удалось обновить питомца!");
    }

    return await response.json();
};
