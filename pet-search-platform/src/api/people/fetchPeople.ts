import type {Person} from "@entities/person/person.types.ts";
import {API_URL} from '../configures.ts'

export const fetchPersonById = async (id: number): Promise<Person> => {
    let response;

    try {
        response = await fetch(`${API_URL}/people/${id}`);
    } catch {
        throw new Error("Не удалось прочитать данные хозяина питомца");
    }

    if (!response.ok) {
        throw new Error("Не удалось прочитать данные хозяина питомца");
    }

    return await response.json();
};

export const fetchPersonByEmail = async (email: string): Promise<Person | null> => {
    const res = await fetch(`${API_URL}/people?email=${encodeURIComponent(email)}`);
    if (!res.ok) {
        throw new Error("Сетевая ошибка при проверке email");
    }
    const arr: Person[] = await res.json();
    return arr.length ? arr[0] : null;
};
