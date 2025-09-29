import { useState } from "react";
import { Modal } from "@components/Modal";
import { Button } from "@components/Button";
import { Text } from "@components/Input";
import { Password } from "@components/Input";
import styles from "./styles/RegisterModal.module.scss";
import React from "react";
import { useRegister } from "@hooks/useRegister";
import { isValidEmail } from "@helpers/isValidEmail";
import {
    validatePasswordRules,
    passwordStrengthLabel,
} from "@helpers/validatePasswordRules";
import {notify} from "@layouts/GlobalNotificationContainer/GlobalNotificationContainer.tsx";
import type {RegisterError} from "@api/errors/registerError.ts";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (user: unknown) => void;
}

export const RegisterModal = ({ isOpen, onClose, onSuccess }: RegisterModalProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatError, setRepeatError] = useState("");

    const { mutate, isPending } = useRegister();

    const handleEmailChange = (val: string) => {
        setEmail(val);
        if (!isValidEmail(val)) {
            setEmailError("Некорректный email");
        } else {
            setEmailError("");
        }
    };

    const handlePasswordChange = (val: string) => {
        setPassword(val);

        if (!validatePasswordRules(val).valid) {
            setPasswordError("Пароль должен содержать минимум 8 символов");
        } else {
            setPasswordError("");
        }

        if (repeat) {
            if (val !== repeat) {
                setRepeatError("Пароли не совпадают");
            } else {
                setRepeatError("");
            }
        }
    };

    const handleRepeatChange = (val: string) => {
        setRepeat(val);

        if (!val) {
            setRepeatError("");
            return;
        }

        if (password && val !== password) {
            setRepeatError("Пароли не совпадают");
        } else {
            setRepeatError("");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setEmailError("Некорректный email");
            return;
        }

        if (!validatePasswordRules(password).valid) {
            setPasswordError("Пароль должен содержать минимум 8 символов");
            return;
        }

        if (password !== repeat) {
            setRepeatError("Пароли не совпадают");
            return;
        }

        mutate(
            { email: email.trim(), password: password.trim() },
            {
                onSuccess: (user) => {
                    onSuccess?.(user);
                    setEmail("");
                    setPassword("");
                    setRepeat("");
                    notify("Регистрация прошла успешно", "success");
                    onClose();
                },
                onError: (err: RegisterError) => {
                    notify(err.message , "error");
                },
            }
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles["register-modal"]}>
                <h2 className={styles["register-modal__title"]}>Регистрация</h2>
                <form className={styles["register-modal__form"]} onSubmit={handleSubmit}>
                    <Text
                        label="Email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onFocus={() => setEmailError("")}
                        required
                        errorMessage={emailError}
                    />

                    <Password
                        label="Пароль"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        onFocus={() => setPasswordError("")}
                        required
                        errorMessage={passwordError}
                        successMessage={
                            validatePasswordRules(password).valid
                                ? `Пароль подходит — ${passwordStrengthLabel(password).label}`
                                : ""
                        }
                    />

                    <Password
                        label="Повторите пароль"
                        value={repeat}
                        onChange={(e) => handleRepeatChange(e.target.value)}
                        onFocus={() => setRepeatError("")}
                        required
                        errorMessage={repeatError}
                        successMessage={repeat && repeat === password ? "Пароли совпадают" : ""}
                    />

                    <Button
                        type="submit"
                        disabled={isPending}
                        className={styles["register-modal__btn-submit"]}
                    >
                        {isPending ? "Регистрация выполняется..." : "Зарегистрироваться"}
                    </Button>
                </form>
            </div>
        </Modal>
    );
};
