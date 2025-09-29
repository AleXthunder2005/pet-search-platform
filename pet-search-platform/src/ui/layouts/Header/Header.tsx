import styles from "./styles/Header.module.scss";
import { Icon } from "@components/Icon/Icon";
import Button from "@components/Button/Button";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export const Header = () => {
    return (
        <header className={styles["header"]}>
            <div className={styles["header__logo"]}>
                <Icon name="petPaw" size={50} color="orange" />
            </div>

            <nav className={styles["header__nav"]}>
                <ul className={styles["nav-list"]}>
                    <li className={styles["nav-list__item"]}>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                clsx(
                                    styles["nav-list__item-link"],
                                    isActive && styles["nav-list__item-link--active"]
                                )
                            }
                        >
                            Потеряшки
                        </NavLink>
                    </li>
                    <li className={styles["nav-list__item"]}>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                clsx(
                                    styles["nav-list__item-link"],
                                    isActive && styles["nav-list__item-link--active"]
                                )
                            }
                        >
                            О проекте
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className={styles["header__actions"]}>
                <Button isPrimary={false}>Зарегистрироваться</Button>
            </div>
        </header>
    );
};

