export interface Person {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    age: number;
    gender: "мужской" | "женский";
    passwordHash: string;
}