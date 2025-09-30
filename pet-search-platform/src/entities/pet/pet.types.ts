export interface Pet {
    id: number;
    petName: string;
    breed: string;
    kind: string;
    sex: "мужской" | "женский";
    disappearanceDate: Date;
    description: string;
    imageUrl?: string;
    city: string;
    personId: number;
}