import { useForm, Controller } from "react-hook-form";
import { Modal } from "@components/Modal";
import { Button } from "@components/Button";
import { Text } from "@components/Input";
import { DatePicker } from "@components/Input";
import { Select } from "@components/Input";
import { TextArea } from "@components/Input";
import { notify } from "@layouts/GlobalNotificationContainer/GlobalNotificationContainer.tsx";
import { useCreatePet } from "@hooks/useCreatePet.ts";
import { useUpdatePet } from "@hooks/useUpdatePet.ts";
import { useAuth } from "@app/contexts/authContext.tsx";
import type { CreatePetDto } from "@api/pets";
import { useEffect, useState } from "react";
import styles from "./styles/AddPetModal.module.scss";
import type { Pet } from "@entities/pet/pet.types.ts";
import clsx from "clsx";
import {ImageWithLoader} from "@components/ImageWithLoader/ImageWithLoader.tsx";
import NoImageSVG from '@images/no-image.svg?react';
import {useDeletePet} from "@hooks/useDeletePet.ts";

interface AddPetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    pet?: Pet;
}

export const AddPetModal = ({ isOpen, onClose, onSuccess, pet }: AddPetModalProps) => {
    const { user } = useAuth();
    const { mutate: createPet, isPending: isCreating } = useCreatePet({
        onSuccess: () => {
            notify("Питомец успешно добавлен!", "success");
            onSuccess?.();
            onClose();
        },
        onError: (err) => {
            notify(err.message, "error");
        },
    });

    const { mutate: updatePet, isPending: isUpdating } = useUpdatePet({
        onSuccess: () => {
            notify("Данные питомца обновлены!", "success");
            onSuccess?.();
            onClose();
        },
        onError: (err) => {
            notify(err.message, "error");
        },
    });

    const { mutate: deletePet, isPending: isDeleting } = useDeletePet({
        onSuccess: () => {
            notify("Объявление о пропаже питомца успешно удалено!", "success");
            onSuccess?.();
            onClose();
        },
        onError: (err) => {
            notify(err.message, "error");
        },
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(pet?.imageUrl ?? null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreatePetDto>({
        mode: "onChange",
        defaultValues: pet
            ? {
                petName: pet.petName,
                breed: pet.breed,
                kind: pet.kind,
                sex: pet.sex,
                city: pet.city,
                disappearanceDate: pet.disappearanceDate ? new Date(pet.disappearanceDate) : undefined,
                description: pet.description,
                imageUrl: pet.imageUrl,
            }
            : {
                petName: "",
                breed: "",
                kind: "",
                sex: "женский",
                city: "",
                disappearanceDate: undefined,
                description: "",
                imageUrl: "",
            },
    });

    useEffect(() => {
        if (isOpen) {
            reset(
                pet
                    ? {
                        petName: pet.petName,
                        breed: pet.breed,
                        kind: pet.kind,
                        sex: pet.sex,
                        city: pet.city,
                        disappearanceDate: pet.disappearanceDate ? new Date(pet.disappearanceDate) : undefined,
                        description: pet.description,
                        imageUrl: pet.imageUrl,
                    }
                    : {
                        petName: "",
                        breed: "",
                        kind: "",
                        sex: "женский",
                        city: "",
                        disappearanceDate: undefined,
                        description: "",
                        imageUrl: "",
                    }
            );
            setPreviewUrl(pet?.imageUrl ?? null);
        }
    }, [isOpen, pet, reset]);

    const onSubmit = (data: CreatePetDto) => {
        if (!user?.id) {
            notify("Ошибка: пользователь не авторизован", "error");
            return;
        }

        if (pet) {
            updatePet({ ...data, id: pet.id, imageUrl: previewUrl || undefined });
        } else {
            createPet({ ...data, personId: user.id, imageUrl: previewUrl || undefined });
        }
    };

    const isPending = isCreating || isUpdating;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles["add-pet-modal"]}>
                <h2 className={styles["add-pet-modal__title"]}>
                    {pet ? "Редактировать питомца" : "Добавить питомца"}
                </h2>
                <form className={styles["add-pet-modal__form"]} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="petName"
                        control={control}
                        rules={{ required: "Введите имя питомца", maxLength: { value: 20, message: "Максимум 20 символов" } }}
                        render={({ field }) => <Text label="Кличка" {...field} errorMessage={errors.petName?.message} required />}
                    />

                    <Controller
                        name="breed"
                        control={control}
                        rules={{ required: "Введите породу", maxLength: { value: 20, message: "Максимум 20 символов" } }}
                        render={({ field }) => <Text label="Порода" {...field} errorMessage={errors.breed?.message} required />}
                    />

                    <Controller
                        name="kind"
                        control={control}
                        rules={{ required: "Введите вид (например Собака, Кошка)", maxLength: { value: 20, message: "Максимум 20 символов" } }}
                        render={({ field }) => <Text label="Вид" {...field} errorMessage={errors.kind?.message} required />}
                    />

                    <Controller
                        name="sex"
                        control={control}
                        render={({ field }) => (
                            <Select label="Пол" options={["женский", "мужской"]} {...field} required />
                        )}
                    />

                    <Controller
                        name="city"
                        control={control}
                        rules={{ required: "Введите город", maxLength: { value: 20, message: "Максимум 20 символов" } }}
                        render={({ field }) => <Text label="Город" {...field} errorMessage={errors.city?.message} required />}
                    />

                    <Controller
                        name="disappearanceDate"
                        control={control}
                        rules={{
                            validate: (value) => {
                                if (!value) return true;
                                const selected = new Date(value);
                                const today = new Date();
                                return selected <= today || "Дата не может быть в будущем";
                            },
                        }}
                        render={({ field }) => (
                            <DatePicker
                                label="Дата пропажи"
                                value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                onBlur={field.onBlur}
                                name={field.name}
                                errorMessage={errors.disappearanceDate?.message}
                                required
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <TextArea label="Описание" {...field} required />}
                    />

                    <Controller
                        name="imageUrl"
                        control={control}
                        render={({ field }) => (
                            <Text
                                label="Ссылка на фото"
                                placeholder="https://example.com/pet.jpg"
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e);
                                    setPreviewUrl(e.target.value);
                                }}
                            />
                        )}
                    />

                    {previewUrl && (
                        <div className={styles["add-pet-modal__preview"]}>
                            <ImageWithLoader
                                src={previewUrl}
                                alt={`pet ${pet?.petName || ""}`}
                                className={styles["add-pet-modal__preview-img"]}
                                fallback={
                                    <NoImageSVG
                                        className={clsx(
                                            styles["add-pet-modal__preview-img"],
                                            styles["add-pet-modal__preview-img--no_image"]
                                        )}
                                    />
                                }
                            />
                        </div>
                    )}

                    <Button type="submit" disabled={isPending} className={styles["add-pet-modal__btn-submit"]}>
                        {isPending ? (pet ? "Сохранение..." : "Добавление...") : pet ? "Сохранить изменения" : "Добавить питомца"}
                    </Button>
                    {pet && (
                        <Button
                            onClick={() => deletePet(pet?.id)}
                            disabled={isDeleting}
                            className={styles["add-pet-modal__btn-submit"]}
                        >
                            {isDeleting ? "Удаление..." : "Удалить объявление"}
                        </Button>
                    )}
                </form>
            </div>
        </Modal>
    );
};
