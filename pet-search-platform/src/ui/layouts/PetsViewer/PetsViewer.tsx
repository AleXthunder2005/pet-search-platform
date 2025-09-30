import styles from "./styles/PetsViewer.module.scss";
import { PetCard } from "@components/PetCard/PetCard";
import type { Pet } from "@entities/pet/pet.types";

interface PetsViewerProps {
    pets: Pet[];
    isLoading: boolean;
    pageSize: number;
    onPetClick?: (pet: Pet) => void;
}

export const PetsViewer = ({ pets, isLoading, pageSize, onPetClick}: PetsViewerProps) => {
    if (isLoading) {
        return (
            <div className={styles["pet-viewer"]}>
                {Array.from({ length: pageSize }).map((_, idx) => (
                    <PetCard key={idx} isPending />
                ))}
            </div>
        );
    }

    if (!pets.length) {
        return <p className={styles["pet-viewer--empty"]}>Тут пусто...</p>
    }

    return (
        <div className={styles["pet-viewer"]}>
            {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} onClick={onPetClick}/>
            ))}
        </div>
    );
};
