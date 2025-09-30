import type { Person } from "@entities/person/person.types.ts";
import { API_URL } from "../configures.ts";
import { LoginError } from "../errors/loginError.ts";
import {md5Hash} from "@utils/md5Hash.ts";

interface LoginInput {
    email: string;
    password: string;
}

export const login = async ({ email, password }: LoginInput): Promise<Person> => {
    let response;

    try {
        response = await fetch(`${API_URL}/people?email=${encodeURIComponent(email)}`);
    } catch {
        throw new LoginError("network", "Возникла сетевая ошибка");
    }

    if (!response.ok) {
        throw new LoginError("network", "Возникла сетевая ошибка");
    }

    let users: Person[] = [];
    try {
        users = await response.json();
    } catch {
        throw new LoginError("network", "Возникла сетевая ошибка");
    }

    if (users.length === 0) {
        throw new LoginError("userNotFound", "Пользователь с таким email не найден");
    }

    const user = users[0];

    if (user.passwordHash !== md5Hash(password)) {
        throw new LoginError("invalidPassword", "Неверный пароль");
    }

    return user;
};
