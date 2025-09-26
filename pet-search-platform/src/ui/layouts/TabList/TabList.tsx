import styles from './styles/TabList.module.scss'
import clsx from "clsx";

export interface ListItem {
    label: string;
    count: number;
}

interface ListProps {
    listTitle: string;
    items: ListItem[];
    activeItem?: ListItem;
    onItemClick?: (item: ListItem) => void;
}

export const TabList = ({
                            listTitle,
                            items,
                            activeItem,
                            onItemClick
                        }: ListProps) => {
    return (
        <div className={styles['tab-list-container']}>
            <p className={styles['tab-list-container__title']}>{listTitle}</p>
            <ul className={styles['tab-list-container__tab-list']}>
                {items.map((listItem) => {
                    const itemClass = clsx(
                        styles['tab-list__item'],
                        {
                            [styles['tab-list__item--active']]: listItem.label === activeItem?.label,
                        }
                    );

                    return (
                        <li
                            key={listItem.label}
                            className={itemClass}
                            onClick={() => onItemClick?.(listItem)}
                        >
                            <span className={styles['tab-list__item-label']}>{listItem.label}</span>
                            <span className={styles['tab-list__item-count']}>{listItem.count}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
