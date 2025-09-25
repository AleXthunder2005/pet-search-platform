import PetPaw from "../icons/petPaw.svg?react";
import UserCircle from "../icons/userCircle.svg?react";
import SuccessCircle from "../icons/correctCircle.svg?react";
import ErrorTriangle from "../icons/errorTriangle.svg?react";

export const iconsMap = {
    petPaw: PetPaw,
    userCircle: UserCircle,
    successCircle: SuccessCircle,
    errorTriangle: ErrorTriangle,
} as const;

export type IconName = keyof typeof iconsMap;