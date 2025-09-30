import styles from './styles/PetCard.module.scss';
import clsx from "clsx";
import NoImageSVG from '@images/no-image.svg?react';
import { ImageWithLoader } from "@components/ImageWithLoader/ImageWithLoader";
import { timeSince } from "@entities/pet/helpers/timeSince";
import type { Pet } from "@entities/pet/pet.types";

interface PetCardProps {
    pet?: Pet;
    isPending?: boolean;
    className?: string;
    onClick?: (pet: Pet) => void;
}

export const PetCard = ({ pet, isPending, className, onClick }: PetCardProps) => {
    const petCardClassList = clsx(styles['pet-card'], className);

    if (isPending) {
        return (
            <div className={petCardClassList}>
                <div className={styles['pet-card__image-wrapper']}>
                    <div className={clsx(styles['pet-card__image'], styles['skeleton'])} />
                </div>

                <div className={styles['pet-card__content']}>
                    <div className={styles['pet-card__header']}>
                        <div className={clsx(styles['pet-card__name'], styles['skeleton'])} />
                        <div className={clsx(styles['pet-card__time'], styles['skeleton'])} />
                    </div>

                    <div className={clsx(styles['pet-card__location'], styles['skeleton'])} />
                    <div className={clsx(styles['pet-card__footer'], styles['skeleton'])} />
                </div>
            </div>
        );
    }


    if (!pet) return null;

    return (
        <div className={petCardClassList}>
            <div className={styles['pet-card__image-wrapper']}
                 onClick={() => onClick?.(pet)}
            >
                <ImageWithLoader
                    src={pet.imageUrl}
                    alt={`pet ${pet.petName}`}
                    className={styles['pet-card__image']}
                    fallback={
                        <NoImageSVG
                            className={clsx(
                                styles['pet-card__image'],
                                styles['pet-card__image--no_image']
                            )}
                        />
                    }
                />
            </div>

            <div className={styles['pet-card__content']}>
                <div className={styles['pet-card__header']}>
                    <h3 className={styles['pet-card__name']}>{pet.petName}</h3>
                    <span className={styles['pet-card__time']}>
            {timeSince(new Date(pet.disappearanceDate))}
          </span>
                </div>

                <div className={styles['pet-card__location']}>{pet.city}</div>

                <div className={styles['pet-card__footer']}>
                    <span className={styles['pet-card__breed']}>{pet.breed}</span>
                </div>
            </div>
        </div>
    );
};
