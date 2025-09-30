import type {Person} from "@entities/person/person.types.ts";
import {API_URL} from "@api/configures.ts";

export const updatePerson = async (person: Person): Promise<Person> => {
    const response = await fetch(`${API_URL}/people/${person.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person),
    });

    if (!response.ok) {
        throw new Error("Не удалось обновить данные пользователя");
    }

    return response.json();
};