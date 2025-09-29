import styles from "./styles/PetsViewer.module.scss";
import { PetCard } from "@components/PetCard/PetCard";
import type { Pet } from "@entities/pet/pet.types";

interface PetViewerProps {
    pets: Pet[];
    isLoading: boolean;
    pageSize: number;
}

export const PetViewer = ({ pets, isLoading, pageSize }: PetViewerProps) => {
    if (isLoading || !pets.length) {
        return (
            <div className={styles["pet-viewer"]}>
                {Array.from({ length: pageSize }).map((_, idx) => (
                    <PetCard key={idx} isPending />
                ))}
            </div>
        );
    }

    return (
        <div className={styles["pet-viewer"]}>
            {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
            ))}
        </div>
    );
};
