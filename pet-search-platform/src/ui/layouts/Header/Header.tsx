import styles from "./styles/Header.module.scss";
import { Icon } from "@components/Icon/Icon";
import Button from "@components/Button/Button";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {useState} from "react";
import {LoginModal} from "@layouts/LoginModal/LoginModal.tsx";
import {RegisterModal} from "@layouts/RegisterModal";
import {useAuth} from "@app/contexts/authContext.tsx";
import {useNavigate} from "react-router";

export const Header = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const { logout, user } = useAuth();
    const navigate = useNavigate();

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
                {!user && (
                    <>
                        <Button isPrimary={false} onClick={() => setIsRegister(true)}>Зарегистрироваться</Button>
                        <Button isPrimary onClick={() => setIsLogin(true)}>Войти</Button>
                    </>
                )}
                {user && (
                    <>
                        <span onClick={() => navigate("/profile")}><Icon name={"userCircle"}
                                                                                  size={50}
                                                                                  hoverable
                                                                                  color={"orange"}
                                                                                  hoverColor={"orange"}
                        /></span>
                        <Button isPrimary={false} onClick={logout}>Выйти</Button>
                    </>
                )}
            </div>

            {isLogin && <LoginModal isOpen={isLogin} onClose={() => setIsLogin(false)}/>}
            {isRegister && <RegisterModal isOpen={isRegister} onClose={() => setIsRegister(false)}/>}
        </header>
    );
};

