import styles from './styles/Searcher.module.scss'
import {useState} from "react";
import {Text} from "@components/Input";
import {Icon} from "@components/Icon";
import clsx from "clsx";

export const Searcher = () => {
    const [isOpen, setIsOpen] = useState(false);

    const switchSearcher = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    const textClassList = clsx (
        styles["searcher__text"],
        {
            [styles["searcher__text--open"]]: isOpen,
        }
    )

    return (
        <div className={styles["searcher"]}>
            <span className={styles["searcher__icon"]} onClick={switchSearcher}><Icon name={"loupe"} hoverable color={"black"} hoverColor={"black"}/></span>
            <Text className={textClassList} placeholder={"Поиск"}/>
        </div>
    );
}
