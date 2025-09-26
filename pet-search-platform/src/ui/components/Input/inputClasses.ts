/*
import clsx from "clsx";

type Modifiers = {[key: string]: boolean | undefined};
type ClassListGetter = (styles: CSSModuleClasses, modifiers: Modifiers, className?: string) => string;

export const getInputClassesList : ClassListGetter = (styles, modifiers, className?) => {
    return clsx(
        styles['input-box__input'],
        {
            [styles["input-box__input--error"]]: modifiers.error,
            [styles["input-box__input--success"]]: modifiers.success,
        },
        className
    );
}

export const getLabelClassesList : ClassListGetter  = (styles, modifiers) => {
    return clsx(
        styles['input-container__label'],
        {
            [styles["input-container__label--required"]]: modifiers.required,
        }
    );
}*/
