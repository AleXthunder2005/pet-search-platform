import type {Person} from "@entities/person/person.types.ts";
import {API_URL} from '../configures.ts'

export const fetchPersonById = async (id: number): Promise<Person> => {
    const response = await fetch(`${API_URL}/people/${id}`);

    if (!response.ok) {
        throw new Error("Не удалось прочитать данные хозяина питомца!");
    }

    return await response.json();
};