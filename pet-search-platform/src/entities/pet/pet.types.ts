export interface Pet {
    petId: number;
    petName: string;
    breed: string;
    sex: "male" | "female";
    disappearanceDate: Date;
    description?: string;
    imageUrl?: string;
}