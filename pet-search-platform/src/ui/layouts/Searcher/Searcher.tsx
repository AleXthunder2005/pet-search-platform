import styles from './styles/Searcher.module.scss';
import { useState } from "react";
import { Text } from "@components/Input";
import { Icon } from "@components/Icon";
import clsx from "clsx";

interface SearcherProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onlyExpanded?: boolean;
}

export const Searcher = ({ value, onChange, placeholder = "Поиск", onlyExpanded = false }: SearcherProps) => {
    const [isOpen, setIsOpen] = useState(onlyExpanded);

    const switchSearcher = () => {
        setIsOpen((prev) => !prev);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const textClassList = clsx(styles["searcher__text"], {
        [styles["searcher__text--open"]]: isOpen,
    });

    return (
        <div className={styles["searcher"]}>
            <span className={styles["searcher__icon"]} onClick={!onlyExpanded ? switchSearcher : undefined}>
                <Icon name={"loupe"} hoverable color={"black"} hoverColor={"black"} />
            </span>
            <Text
                className={textClassList}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};
