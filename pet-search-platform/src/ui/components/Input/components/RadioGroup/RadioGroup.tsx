import clsx from "clsx";
import styles from "./styles/RadioGroup.module.scss";

interface RadioProps {
    label?: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
}

interface RadioGroupProps {
    name?: string;
    label?: string;
    items: RadioProps[];
    className?: string;
}

export const RadioGroup = ({label, items, name, className} : RadioGroupProps) => {
    const labelClassList = clsx(
        styles["radiogroup__label"],
        className
    )

    return (
        <div className={styles["radiogroup"]}>
            {label && (<label className={labelClassList}>
                {label}
            </label>)}
            <div className={styles["radiogroup__radio-buttons"]}>
                {items.map((item, index) => (
                    <label className={styles["radio-buttons__label"]} key={index}>
                        <input type={"radio"}
                               name={name}
                               value={item.value}
                               className={styles["radio-buttons__button"]}
                               checked={item.checked}
                               disabled={item.disabled}
                        />
                        {item.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default RadioGroup;