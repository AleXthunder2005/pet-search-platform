import {type ChangeEvent, useId, useState} from "react";
import clsx from "clsx";
import styles from "./styles/FileUpload.module.scss";
import type { InputBaseProps } from "@components/Input/input.types.ts";
import {Icon} from "@components/Icon";

interface FileUploadProps extends InputBaseProps {
    accept?: string;
    multiple?: boolean;
}

export const FileUpload = ({
                               label,
                               id,
                               errorMessage,
                               success,
                               required,
                               className,
                               disabled,
                               accept = "image/*",
                               multiple = true,
                               ...rest
                           }: FileUploadProps) => {

    const [fileName, setFileName] = useState("");
    const generatedID = useId();
    const inputId = id ? id : (label ? generatedID : undefined);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setFileName(
            files && files.length > 0
                ? Array.from(files).map((f) => f.name).join(", ")
                : ""
        );
        rest.onChange?.(e);
    };

    const inputClassList = clsx(
        styles["input-box__file"],
        {
            [styles["input-box__file--error"]]: errorMessage,
            [styles["input-box__file--success"]]: success,
            [styles["input-box__file--disabled"]]: disabled,
        },
        className
    );

    const labelClassList = clsx(styles["input-container__label"], {
        [styles["input-container__label--required"]]: required,
    });

    const folderIcon = <Icon name={"documentPlus"} hoverable
                             color={"orange"} hoverColor={"orange"} size={20}/>
    
    return (
        <div className={styles["input-container"]}>
            {label && (<label htmlFor={inputId} className={labelClassList}>{label}</label>)}
            <div className={styles["input-box"]}>
                <label htmlFor={inputId} className={inputClassList}>
                    <span className={styles["input-box__file-text"]}>{fileName || "Выберите файлы"}</span>
                    <span className={styles["input-box__file-icon"]}>{folderIcon}</span>
                </label>
                <input
                    id={inputId}
                    type="file"
                    disabled={disabled}
                    accept={accept}
                    multiple={multiple}
                    className={styles["input-box__file-input"]}
                    onChange={handleChange}
                    required={required}
                />
            </div>
            <span className={styles["input-container__error-message"]}>{errorMessage}</span>
        </div>
    );
};
