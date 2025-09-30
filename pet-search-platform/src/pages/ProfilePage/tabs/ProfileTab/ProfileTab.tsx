import { useForm, Controller } from "react-hook-form";
import { Button } from "@components/Button";
import { Text } from "@components/Input";
import { Select } from "@components/Input";
import { notify } from "@layouts/GlobalNotificationContainer/GlobalNotificationContainer.tsx";
import { useAuth } from "@app/contexts/authContext.tsx";
import { usePerson } from "@hooks/usePerson.ts";
import { useUpdatePerson } from "@hooks/useUpdatePerson.ts";
import { useEffect } from "react";
import type { Person } from "@entities/person/person.types.ts";
import styles from "./styles/ProfileTab.module.scss";
import { Spinner } from "@components/Spinner";

export const ProfileTab = () => {
    const { user } = useAuth();
    const { data: person, isLoading } = usePerson(user?.id);

    const { mutate, isPending } = useUpdatePerson({
        onSuccess: () => notify("Данные обновлены!", "success"),
        onError: (err) => notify(err.message, "error"),
    });

    const { control, handleSubmit, reset, clearErrors, formState: { errors, isValid } } = useForm<Person>({
        mode: "onChange",
        defaultValues: {
            name: "",
            surname: "",
            gender: "мужской",
            email: user?.email || "",
            phone: "",
            age: 0,
        },
    });

    useEffect(() => {
        if (person) reset({
            name: person.name || "",
            surname: person.surname || "",
            gender: person.gender || "мужской",
            email: person.email || user?.email || "",
            phone: person.phone || "",
            age: person.age ?? undefined,
        });
    }, [person, reset, user?.email]);

    const onSubmit = (data: Person) => {
        if (!isValid) {
            notify("Проверьте корректность заполненных полей!", "error");
            return;
        }

        if (!user?.id) {
            notify("Ошибка: пользователь не авторизован", "error");
            return;
        }

        mutate({ ...data, id: user.id, passwordHash: user.passwordHash });
    };

    if (isLoading) {
        return (
            <div className={styles["spinner-container"]}>
                <Spinner size={70} color={"gray"} />
            </div>
        );
    }

    return (
        <div className={styles["profile-tab"]}>
            <h2 className={styles["profile-tab__title"]}>Мои данные</h2>
            <form className={styles["profile-tab__form"]} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ maxLength: { value: 50, message: "Слишком длинное имя" } }}
                    render={({ field }) => (
                        <Text
                            label="Имя"
                            {...field}
                            errorMessage={errors.name?.message}
                            required
                            onBlur={() => { if (!field.value) clearErrors("name"); }}
                        />
                    )}
                />

                <Controller
                    name="surname"
                    control={control}
                    defaultValue=""
                    rules={{ maxLength: { value: 50, message: "Слишком длинная фамилия" } }}
                    render={({ field }) => (
                        <Text
                            label="Фамилия"
                            {...field}
                            errorMessage={errors.surname?.message}
                            required
                            onBlur={() => { if (!field.value) clearErrors("surname"); }}
                        />
                    )}
                />

                <Controller
                    name="gender"
                    control={control}
                    defaultValue="мужской"
                    rules={{ required: "Выберите пол" }}
                    render={({ field }) => <Select label="Пол" options={["мужской", "женский"]} {...field} required />}
                />

                <Controller
                    name="email"
                    control={control}
                    defaultValue={person?.email || user?.email || ""}
                    render={({ field }) => <Text label="Email" {...field} disabled />}
                />

                <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{
                        pattern: { value: /^[0-9+\-() ]{5,20}$/, message: "Некорректный формат телефона" },
                    }}
                    render={({ field }) => (
                        <Text
                            label="Телефон"
                            {...field}
                            errorMessage={errors.phone?.message}
                            required
                            onBlur={() => { if (!field.value) clearErrors("phone"); }}
                        />
                    )}
                />

                <Controller
                    name="age"
                    control={control}
                    defaultValue={0}
                    rules={{
                        min: { value: 1, message: "Возраст должен быть больше 0" },
                        max: { value: 120, message: "Слишком большой возраст" },
                        pattern: { value: /^\d+$/, message: "Возраст должен быть числом" },
                    }}
                    render={({ field }) => (
                        <Text
                            label="Возраст"
                            {...field}
                            errorMessage={errors.age?.message}
                            required
                            onBlur={() => { if (!field.value) clearErrors("age"); }}
                        />
                    )}
                />

                <Button type="submit" disabled={isPending} className={styles["profile-tab__btn-submit"]}>
                    {isPending ? "Сохранение..." : "Сохранить"}
                </Button>
            </form>
        </div>
    );
};
