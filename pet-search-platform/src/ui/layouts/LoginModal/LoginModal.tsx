import { useForm, Controller } from "react-hook-form";
import { Modal } from "@components/Modal";
import { Button } from "@components/Button";
import { Password, Text } from "@components/Input";
import { useLogin } from "@hooks/useLogin.ts";
import styles from "./styles/LoginModal.module.scss";
import type { LoginError } from "@api/errors/loginError.ts";
import { notify } from "@layouts/GlobalNotificationContainer/GlobalNotificationContainer.tsx";
import {useAuth} from "@app/contexts/authContext.tsx";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (user: unknown) => void;
}

interface LoginFormInputs {
    email: string;
    password: string;
}

export const LoginModal = ({ isOpen, onClose, onSuccess }: LoginModalProps) => {

    const { login } = useAuth();
    const {
        control,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm<LoginFormInputs>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate, isPending } = useLogin();

    const onSubmit = ({ email, password }: LoginFormInputs) => {
        if (!email || !password) {
            notify("Проверьте корректность полей", "error");

            if (!email) setError("email", { type: "manual", message: "Введите email" });
            if (!password) setError("password", { type: "manual", message: "Введите пароль" });

            return;
        }

        mutate(
            { email, password },
            {
                onSuccess: (user) => {
                    login(user);
                    notify("С возвращением!", "success");
                    onSuccess?.(user);
                    onClose();
                },
                onError: (err: LoginError) => {
                    switch (err.type) {
                        case "userNotFound":
                            setError("email", { type: "manual", message: err.message });
                            break;
                        case "invalidPassword":
                            setError("password", { type: "manual", message: err.message });
                            break;
                        default:
                            notify(err.message, "error");
                    }
                },
            }
        );
    };

    const onInvalid = () => {
        notify("Проверьте корректность полей", "error");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles["login-modal"]}>
                <h2 className={styles["login-modal__title"]}>Вход</h2>
                <form className={styles["login-modal__form"]} onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: "Введите email" }}
                        render={({ field }) => (
                            <Text
                                label="Email"
                                type="email"
                                {...field}
                                onFocus={() => clearErrors("email")}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "Введите пароль" }}
                        render={({ field }) => (
                            <Password
                                label="Пароль"
                                {...field}
                                onFocus={() => clearErrors("password")}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isPending}
                        className={styles["login-modal__btn-submit"]}
                    >
                        {isPending ? "Выполняется вход..." : "Войти"}
                    </Button>
                </form>
            </div>
        </Modal>
    );
};
