export interface Pet {
    petId: number;
    petName: string;
    breed: string;
    sex: "мужской" | "женский";
    disappearanceDate: Date;
    description?: string;
    imageUrl?: string;
}