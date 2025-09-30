import styles from './styles/Pagination.module.scss';
import getVisiblePages from "./helpers/getVisiblePages.ts";
import clsx from "clsx";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const visiblePages = getVisiblePages(currentPage, totalPages);

    return (
        <div className={styles['pagination-container']}>
            <button
                className={styles['pagination-container__pagination-button']}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                &lt;
            </button>

            {visiblePages.map(page => (
                <button
                    className={clsx(styles['pagination-container__pagination-button'],
                        {
                            [styles['pagination-container__pagination-button--active']]: page === currentPage
                        })
                    }
                    onClick={() => onPageChange(page)}
                    key={page}
                >
                    {page}
                </button>
            ))}

            <button
                className={styles['pagination-container__pagination-button']}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                &gt;
            </button>
        </div>
    );
};