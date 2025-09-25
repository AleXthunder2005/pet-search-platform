import PetPaw from "../icons/petPaw.svg?react";
import UserCircle from "../icons/userCircle.svg?react";

export const iconsMap = {
    petPaw: PetPaw,
    userCircle: UserCircle,
} as const;

export type IconName = keyof typeof iconsMap;