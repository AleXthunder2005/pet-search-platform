import styles from './styles/AboutPetModal.module.scss'
import { usePet } from "@hooks/usePet";
import { usePerson } from "@hooks/usePerson";
import { Spinner } from "@components/Spinner";
import { Notification } from "@components/Notification";
import { Modal } from "@components/Modal";
import clsx from "clsx";
import { ImageWithLoader } from "@components/ImageWithLoader/ImageWithLoader";
import NoImageSVG from "@images/no-image.svg?react";
import {timeSince} from "@entities/pet/helpers/timeSince.ts";

interface AboutPetModalProps {
    petId?: number;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export const AboutPetModal = ({
                                  petId,
                                  isOpen,
                                  onClose,
                                  className,
                              }: AboutPetModalProps) => {
    const { data: petData, isLoading: isPetLoading, isError: isPetError } = usePet(petId);

    const { data: personData, isLoading: isPersonLoading, isError: isPersonError } =
        usePerson(petData?.personId, { enabled: !!petData?.personId });

    const modalClassList = clsx(styles["about-pet-modal"], className);

    const isLoading = isPetLoading || isPersonLoading;
    const isError = isPetError || isPersonError;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {isLoading && (
                <div className={styles["spinner-container"]}>
                    <Spinner size={50} />
                </div>
            )}

            {isError && (
                <Notification message="Не удалось прочитать данные питомца! Возможно питомец или его владелец удалены." status="error" />
            )}

            {petData && personData && (
                <div className={modalClassList}>
                    <div className={styles["about-pet-modal__image-wrapper"]}>
                        <ImageWithLoader
                            src={petData.imageUrl}
                            alt={`pet ${petData.petName}`}
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
                                {petData.petName} ({petData.sex === "male" ? "Мальчик" : "Девочка"})
                            </h2>
                            <span className={styles["about-pet-modal__time"]}>
                                {timeSince(new Date (petData.disappearanceDate))}
                            </span>
                        </div>

                        <div className={styles["about-pet-modal__info"]}>
                            <p className={styles["about-pet-modal__breed"]}>{petData.breed}</p>
                            <p className={styles["about-pet-modal__city"]}>{petData.city}</p>
                        </div>

                        {petData.description && (
                            <p className={styles["about-pet-modal__description"]}>
                                {petData.description}
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
