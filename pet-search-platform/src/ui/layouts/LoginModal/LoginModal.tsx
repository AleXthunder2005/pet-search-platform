import { useState } from "react";
import { Modal } from "@components/Modal";
import { Button } from "@components/Button";
import { Notification } from "@components/Notification";
import { useLogin } from "@hooks/useLogin.ts";
import styles from "./styles/LoginModal.module.scss";
import { Password } from "@components/Input";
import { Text } from "@components/Input";
import React from "react";
import type { LoginError } from "@api/errors/loginError.ts";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (user: unknown) => void;
}

export const LoginModal = ({ isOpen, onClose, onSuccess }: LoginModalProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const { mutate, isPending, error } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(
            { email, password },
            {
                onSuccess: (user) => {
                    onSuccess?.(user);
                    onClose();
                },
                onError: (err: LoginError) => {
                    switch (err.type) {
                        case "userNotFound":
                            setEmailError(err.message);
                            break;
                        case "invalidPassword":
                            setPasswordError(err.message);
                            break;
                    }
                },
            }
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles["login-modal"]}>
                <h2 className={styles["login-modal__title"]}>Вход</h2>
                <form className={styles["login-modal__form"]} onSubmit={handleSubmit}>
                    <Text
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailError("")}
                        required
                        errorMessage={emailError}
                    />
                    <Password
                        label="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordError("")}
                        required
                        errorMessage={passwordError}
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

            {error && error.type === "network" && (
                <Notification message={error.message} status="error" />
            )}
        </Modal>
    );
};
