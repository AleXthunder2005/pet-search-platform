import { useForm, Controller } from "react-hook-form";
import { Modal } from "@components/Modal";
import { Button } from "@components/Button";
import { Text } from "@components/Input";
import { Password } from "@components/Input";
import styles from "./styles/RegisterModal.module.scss";
import { useRegister } from "@hooks/useRegister";
import { isValidEmail } from "@helpers/isValidEmail";
import { validatePasswordRules, passwordStrengthLabel } from "@helpers/validatePasswordRules";
import { notify } from "@layouts/GlobalNotificationContainer/GlobalNotificationContainer.tsx";
import type { RegisterError } from "@api/errors/registerError.ts";

type FormValues = {
    email: string;
    password: string;
    repeat: string;
};

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (user: unknown) => void;
}

export const RegisterModal = ({ isOpen, onClose, onSuccess }: RegisterModalProps) => {
    const {
        control,
        handleSubmit,
        watch,
        setError,
        reset,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: { email: "", password: "", repeat: "" },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const { mutateAsync, isPending } = useRegister();

    const onSubmit = async (data: FormValues) => {
        try {
            const user = await mutateAsync({ email: data.email.trim(), password: data.password.trim() });
            notify("Регистрация прошла успешно", "success");
            reset();
            onSuccess?.(user);
            onClose();
        } catch (err: any) {
            const regErr = err as RegisterError | Error;
            if ((regErr as RegisterError).type === "emailIsAlreadyExists") {
                setError("email", { type: "server", message: (regErr as RegisterError).message });
                return;
            }

            notify(regErr.message || "Ошибка сети", "error");
        }
    };

    const onInvalid = () => {
        notify("Проверьте корректность полей", "error");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles["register-modal"]}>
                <h2 className={styles["register-modal__title"]}>Регистрация</h2>

                <form className={styles["register-modal__form"]} onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "Введите email",
                            validate: (v) => isValidEmail(v) || "Некорректный email",
                        }}
                        render={({ field }) => (
                            <Text
                                label="Email"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                required
                                errorMessage={field.value ? (errors.email?.message) : ""}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: "Введите пароль",
                            validate: (v) =>
                                validatePasswordRules(v).valid ||
                                "Пароль должен содержать минимум 8 символов",
                        }}
                        render={({ field }) => (
                            <Password
                                label="Пароль"
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                    trigger("repeat");
                                }}
                                required
                                errorMessage={field.value ? (errors.password?.message) : undefined}
                                successMessage={
                                    field.value && !errors.password
                                        ? `Пароль подходит — ${passwordStrengthLabel(field.value).label}`
                                        : ""
                                }
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="repeat"
                        rules={{
                            required: "Повторите пароль",
                            validate: (v) => v === watch("password") || "Пароли не совпадают",
                        }}
                        render={({ field }) => (
                            <Password
                                label="Повторите пароль"
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                required
                                errorMessage={field.value ? (errors.repeat?.message) : ""}
                                successMessage={
                                    field.value && !errors.repeat && field.value === watch("password")
                                        ? "Пароли совпадают"
                                        : ""
                                }
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting || isPending}
                        className={styles["register-modal__btn-submit"]}
                    >
                        {isSubmitting || isPending ? "Регистрация выполняется..." : "Зарегистрироваться"}
                    </Button>
                </form>
            </div>
        </Modal>
    );
}
