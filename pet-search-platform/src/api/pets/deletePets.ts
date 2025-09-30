import {API_URL} from "@api/configures.ts";

export const deletePet = async (id: number) => {
    const response = await fetch(`${API_URL}/pets/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Не удалось удалить питомца");
    }

    return true;
};