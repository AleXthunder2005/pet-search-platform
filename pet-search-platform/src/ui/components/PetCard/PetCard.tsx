import styles from './styles/PetCard.module.scss'
import clsx from "clsx";
import NoImageSVG from '@images/no-image.svg?react';
import {ImageWithLoader} from "@components/ImageWithLoader/ImageWithLoader.tsx";
import {timeSince} from "@entities/pet/helpers/timeSince.ts";

interface PetCardProps {
    petId: number;
    name: string;
    breed: string;
    imageUrl?: string;
    disappearanceDate: Date;
    city: string;
    className?: string;
}

export const PetCard = ({
                            name,
                            breed,
                            imageUrl,
                            disappearanceDate,
                            city,
                            className
                        }: PetCardProps) => {
    const petCardClassList = clsx(styles['pet-card'], className);

    return (
        <div className={petCardClassList}>
            <div className={styles['pet-card__image-wrapper']}>
                <ImageWithLoader
                    src={imageUrl}
                    alt={`pet ${name}`}
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
                    <h3 className={styles['pet-card__name']}>{name}</h3>
                    <span className={styles['pet-card__time']}>
                        {timeSince(disappearanceDate)}
                    </span>
                </div>

                <div className={styles['pet-card__location']}>{city}</div>

                <div className={styles['pet-card__footer']}>
                    <span className={styles['pet-card__breed']}>{breed}</span>
                </div>
            </div>
        </div>
    );
};
