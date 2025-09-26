import clsx from "clsx";
import styles from "./styles/Icon.module.scss";
import React from "react";
import {type IconName, iconsMap} from "./helpers/iconsMap.ts";
import type {IconColor} from "@components/Icon/types/icon.types.ts";

interface IconProps {
    name: IconName;
    size?: number;
    color?: IconColor;
    hoverColor?: IconColor;
    className?: string;
    hoverable?: boolean;
}

export const Icon = ({
                         name,
                         size = 30,
                         color,
                         hoverable = false,
                         hoverColor,
                         className,
                     }: IconProps) => {
    const SvgIcon = iconsMap[name];
    const classList = clsx(
        styles.icon,
        {
            [styles[`icon--color_${color}`]] : color,
            [styles[`icon--hover-color_${hoverColor}`]] : hoverColor,
            [styles[`icon--hoverable`]] : hoverable,
        },
        className
    );

    const iconStyle: React.CSSProperties = {
        width: size,
        height: size,
    };

    return <SvgIcon className={classList} style={iconStyle} />;
};
