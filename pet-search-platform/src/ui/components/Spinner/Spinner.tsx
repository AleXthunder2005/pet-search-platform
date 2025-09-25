import clsx from "clsx";
import styles from "./styles/Spinner.module.scss";

interface SpinnerProps {
    color?: "gray" | "orange";
    size: number;
    className?: string;
}

export const Spinner = ({
                            color = "orange",
                            size,
                            className,
                        } : SpinnerProps) =>
{
    const style = { width: size, height: size };
    const classNames = clsx(styles.loader, styles[`loader--${color}`], className);
    return (
        <span
            className={classNames}
            style={style}
        />
    );
};

