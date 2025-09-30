import { useForm, Controller } from "react-hook-form";
import { Modal } from "@components/Modal";
import { Button } from "@components/Button";
import { Text } from "@components/Input";
import { DatePicker } from "@components/Input";
import { Select } from "@components/Input";
import { TextArea } from "@components/Input";
import { FileUpload } from "@components/Input";
import { notify } from "@layouts/GlobalNotificationContainer/GlobalNotificationContainer.tsx";
import { useCreatePet } from "@hooks/useCreatePet.ts";
import { useAuth } from "@app/contexts/authContext.tsx";
import type { CreatePetDto } from "@api/pets";
import {useEffect, useState} from "react";
import styles from "./styles/AddPetModal.module.scss";

interface AddPetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const AddPetModal = ({ isOpen, onClose, onSuccess }: AddPetModalProps) => {
    const { user } = useAuth();
    const { mutate, isPending } = useCreatePet({
        onSuccess: () => {
            notify("Питомец успешно добавлен!", "success");
            onSuccess?.();
            onClose();
        },
        onError: (err) => {
            notify(err.message, "error");
        },
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreatePetDto>({
        mode: "onChange",
        defaultValues: {
            petName: "",
            breed: "",
            kind: "",
            sex: "женский",
            city: "",
            disappearanceDate: undefined,
            description: "",
        }
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
            setPreviewUrl(null);
        }
    }, [isOpen, reset]);

    const onSubmit = (data: CreatePetDto) => {
        if (!user?.id) {
            notify("Ошибка: пользователь не авторизован", "error");
            return;
        }
        mutate({ ...data, personId: user.id, imageUrl: previewUrl || undefined });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles["add-pet-modal"]}>
                <h2 className={styles["add-pet-modal__title"]}>Добавить питомца</h2>
                <form
                    className={styles["add-pet-modal__form"]}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FileUpload
                        label="Фото"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const url = URL.createObjectURL(file);
                                setPreviewUrl(url);
                            }
                        }}
                    />

                    {previewUrl && (
                        <div className={styles["add-pet-modal__preview"]}>
                            <img className={styles["add-pet-modal__preview-img"]} src={previewUrl} alt="Превью питомца" />
                        </div>
                    )}

                    <Controller
                        name="petName"
                        control={control}
                        rules={{
                            required: "Введите имя питомца",
                            maxLength: { value: 20, message: "Максимум 20 символов" },
                        }}
                        render={({ field }) => (
                            <Text
                                label="Кличка"
                                {...field}
                                errorMessage={errors.petName?.message}
                                required
                            />
                        )}
                    />

                    <Controller
                        name="breed"
                        control={control}
                        rules={{
                            required: "Введите породу",
                            maxLength: { value: 20, message: "Максимум 20 символов" },
                        }}
                        render={({ field }) => (
                            <Text
                                label="Порода"
                                {...field}
                                errorMessage={errors.breed?.message}
                                required
                            />
                        )}
                    />

                    <Controller
                        name="kind"
                        control={control}
                        rules={{
                            required: "Введите вид (например Собака, Кошка)",
                            maxLength: { value: 20, message: "Максимум 20 символов" },
                        }}
                        render={({ field }) => (
                            <Text
                                label="Вид"
                                {...field}
                                errorMessage={errors.kind?.message}
                                required
                            />
                        )}
                    />

                    <Controller
                        name="sex"
                        control={control}
                        defaultValue="женский"
                        render={({ field }) => (
                            <Select
                                label="Пол"
                                options={["женский", "мужской"]}
                                {...field}
                                required
                            />
                        )}
                    />

                    <Controller
                        name="city"
                        control={control}
                        rules={{
                            required: "Введите город",
                            maxLength: { value: 20, message: "Максимум 20 символов" },
                        }}
                        render={({ field }) => (
                            <Text
                                label="Город"
                                {...field}
                                errorMessage={errors.city?.message}
                                required
                            />
                        )}
                    />

                    <Controller
                        name="disappearanceDate"
                        control={control}
                        rules={{
                            validate: (value) => {
                                if (!value) return true;
                                const selected = new Date(value);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
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
                        render={({ field }) => (
                            <TextArea
                                label="Описание"
                                {...field}
                                required
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isPending}
                        className={styles["add-pet-modal__btn-submit"]}
                    >
                        {isPending ? "Добавление..." : "Добавить питомца"}
                    </Button>
                </form>
            </div>
        </Modal>
    );
};
