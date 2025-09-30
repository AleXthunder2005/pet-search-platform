import styles from "./styles/AboutPage.module.scss";
import {Wrapper} from "@layouts/Wrapper";
import {Header} from "@layouts/Header";

export const AboutPage = () => {
    return (
        <Wrapper className={styles["about-page"]}>
            <Header/>

            <h1 className={styles["about-page__title"]}>О проекте</h1>
            <p className={styles["about-page__description"]}>
                Наша платформа помогает владельцам быстро находить потерянных питомцев и
                делиться информацией о них с сообществом. Это безопасный и удобный способ
                увеличить шансы на возвращение питомца домой.
            </p>

            <h2 className={styles["about-page__subtitle"]}>Основные возможности:</h2>
            <ul className={styles["about-page__features"]}>
                <li className={styles["about-page__feature"]}>Просмотр и поиск потерянных питомцев по городу и виду животного</li>
                <li className={styles["about-page__feature"]}>Регистрация и авторизация пользователей</li>
                <li className={styles["about-page__feature"]}>Добавление, редактирование и удаление информации о своих питомцах</li>
                <li className={styles["about-page__feature"]}>Возможность прикреплять фотографии питомцев</li>
                <li className={styles["about-page__feature"]}>Уведомления и быстрый отклик сообщества</li>
            </ul>
        </Wrapper>
    );
};
