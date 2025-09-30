import styles from './styles/AboutPetModal.module.scss'
import { usePerson } from "@hooks/usePerson";
import { Spinner } from "@components/Spinner";
import { Notification } from "@components/Notification";
import { Modal } from "@components/Modal";
import clsx from "clsx";
import { ImageWithLoader } from "@components/ImageWithLoader/ImageWithLoader";
import NoImageSVG from "@images/no-image.svg?react";
import { timeSince } from "@entities/pet/helpers/timeSince.ts";
import type { Pet } from "@entities/pet/pet.types";

interface AboutPetModalProps {
    pet?: Pet;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export const AboutPetModal = ({
                                  pet,
                                  isOpen,
                                  onClose,
                                  className,
                              }: AboutPetModalProps) => {
    const { data: personData, isLoading, isError } =
        usePerson(pet?.personId, { enabled: !!pet?.personId });

    const modalClassList = clsx(styles["about-pet-modal"], className);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {isLoading && (
                <div className={styles["spinner-container"]}>
                    <Spinner size={50} />
                </div>
            )}

            {isError && (
                <Notification message="Не удалось прочитать данные владельца." status="error" />
            )}

            {pet && personData && (
                <div className={modalClassList}>
                    <div className={styles["about-pet-modal__image-wrapper"]}>
                        <ImageWithLoader
                            src={pet.imageUrl}
                            alt={`pet ${pet.petName}`}
                            className={styles["about-pet-modal__image"]}
                            fallback={
                                <NoImageSVG
                                    className={clsx(
                                        styles["about-pet-modal__image"],
                                        styles["about-pet-modal__image--no_image"]
                                    )}
                                />
                            }
                        />
                    </div>

                    <div className={styles["about-pet-modal__content"]}>
                        <div className={styles["about-pet-modal__header"]}>
                            <h2 className={styles["about-pet-modal__name"]}>
                                {pet.petName} ({pet.sex === "мужской" ? "Мальчик" : "Девочка"})
                            </h2>
                            <span className={styles["about-pet-modal__time"]}>
                                {timeSince(new Date(pet.disappearanceDate))}
                            </span>
                        </div>

                        <div className={styles["about-pet-modal__info"]}>
                            <p className={styles["about-pet-modal__breed"]}>{pet.breed}</p>
                            <p className={styles["about-pet-modal__city"]}>{pet.city}</p>
                        </div>

                        {pet.description && (
                            <p className={styles["about-pet-modal__description"]}>
                                {pet.description}
                            </p>
                        )}

                        <div className={styles["about-pet-modal__owner"]}>
                            <h3 className={styles["about-pet-modal__owner-title"]}>
                                Контакты владельца
                            </h3>
                            <p>
                                {personData.name} {personData.surname}
                            </p>
                            <a
                                href={`тел:${personData.phone}`}
                                className={styles["about-pet-modal__phone"]}
                            >
                                {personData.phone}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};
