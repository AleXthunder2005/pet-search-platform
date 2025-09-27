import React, { useState } from "react";
import styles from "./styles/ImageWithLoader.module.scss";
import {Spinner} from "@components/Spinner";
import NoImageSVG from '@images/no-image.svg?react';
import clsx from "clsx";

interface ImageWithLoaderProps {
    src?: string;
    alt?: string;
    className?: string;
    loader?: React.ReactNode;
    fallback?: React.ReactNode;
}

const defaultLoader = <Spinner size={50}/>;
const defaultFallback = <NoImageSVG/>;

export const ImageWithLoader = ({
                                    src = '',
                                    alt = 'img',
                                    className,
                                    loader = defaultLoader,
                                    fallback = defaultFallback,
                                }: ImageWithLoaderProps) => {
    const [loading, setLoading] = useState(!!src);
    const [error, setError] = useState(!src);

    if (!src || error) {
        return <div className={styles['wrapper']}>{fallback}</div>;
    }

    const imgClassList = clsx(
        {
            [styles['hidden']]:loading
        },
        className
    );

    return (
        <div className={styles['wrapper']}>
            {loading && <div className={styles['loader']}>{loader}</div>}
            <img
                src={src}
                alt={alt}
                className={imgClassList}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setError(true);
                    setLoading(false);
                }}
            />
        </div>
    );
};
