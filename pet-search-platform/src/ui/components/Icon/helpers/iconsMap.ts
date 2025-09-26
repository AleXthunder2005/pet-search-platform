import PetPaw from "../icons/petPaw.svg?react";
import UserCircle from "../icons/userCircle.svg?react";
import SuccessCircle from "../icons/correctCircle.svg?react";
import ErrorTriangle from "../icons/errorTriangle.svg?react";
import Eye from "../icons/eye.svg?react";
import EyeSlash from "../icons/eyeSlash.svg?react";
import Loupe from "../icons/loupe.svg?react";

export const iconsMap = {
    petPaw: PetPaw,
    userCircle: UserCircle,
    successCircle: SuccessCircle,
    errorTriangle: ErrorTriangle,
    eye: Eye,
    eyeSlash: EyeSlash,
    loupe: Loupe,
} as const;

export type IconName = keyof typeof iconsMap;