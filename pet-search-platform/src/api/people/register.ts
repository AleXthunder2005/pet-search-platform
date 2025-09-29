import type {Person} from "@entities/person/person.types.ts";
import {API_URL} from "@api/configures.ts";
import {fetchPersonByEmail} from "@api/people/fetchPeople.ts";
import {RegisterError} from "@api/errors/registerError.ts";

interface RegisterProps {
    email: string;
    passwordHash: string;
}

export const createPerson = async (payload: RegisterProps): Promise<Person> => {
    let response;
    let person;
    try {
        person = await fetchPersonByEmail(payload.email);
    } catch (error) {
        throw new RegisterError("network", "Возникла сетевая ошибка при регистрации");
    }
    if (person) {
        throw new RegisterError("emailIsAlreadyExists", "Аккаунт с таким email уже зарегистрирован");
    }

    try {
        response = await fetch(`${API_URL}/people`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    } catch {
        throw new RegisterError("network", "Возникла сетевая ошибка при регистрации");
    }
    if (!response.ok) {
        throw new RegisterError("network", "Возникла сетевая ошибка при регистрации");
    }
    return response.json();
};