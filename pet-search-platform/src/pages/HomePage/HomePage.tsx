import styles from './styles/HomePage.module.scss';
import { Header } from "@layouts/Header/Header";
import { Wrapper } from "@layouts/Wrapper/Wrapper";
import { Pagination } from "@components/Pagination/Pagination";
import { useState, useEffect, useMemo } from "react";
import { Searcher } from "@layouts/Searcher";
import { PetViewer } from "@layouts/PetsViewer/PetsViewer.tsx";
import { notify } from "@layouts/GlobalNotificationContainer/GlobalNotificationContainer.tsx";
import { TabList } from "@layouts/TabList";
import type { ListItem } from "@layouts/TabList/TabList.tsx";
import { useAllPets } from "@hooks/useAllPets.ts";
import {buildTabItems, filterPets, paginatePets} from "@pages/HomePage/helpers/filters.ts";

const PAGE_SIZE = 6;

export const HomePage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState<string | undefined>(undefined);

    const { data: allPets = [], isLoading, isError } = useAllPets();

    const filteredBySearchPets = useMemo(
        () => filterPets(allPets, search),
        [allPets, search]
    );
    const tabItems = useMemo(() => buildTabItems(filteredBySearchPets), [filteredBySearchPets]);
    const filteredPets = useMemo(() => filterPets(filteredBySearchPets, undefined, activeTab), [filteredBySearchPets, activeTab]);
    const totalPages = Math.max(1, Math.ceil(filteredPets.length / PAGE_SIZE));

    const paginatedPets = useMemo(
        () => paginatePets(filteredPets, page, PAGE_SIZE),
        [filteredPets, page, PAGE_SIZE]
    );

    const handleTabClick = (item: ListItem) => {
        setActiveTab(item.label);
        setPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    useEffect(() => {
        if (isError) {
            notify("Не удалось загрузить данные. Попробуйте позже.", "error");
        }
    }, [isError]);

    return (
        <Wrapper>
            <Header />
            <main className={styles["home-page__main"]}>
                <aside className={styles["home-page__sidebar"]}>
                    <Searcher value={search} onChange={handleSearchChange} onlyExpanded />

                    <TabList
                        listTitle="Виды питомцев"
                        items={tabItems}
                        activeItem={tabItems.find((i) => i.label === activeTab)}
                        onItemClick={handleTabClick}
                    />
                </aside>

                <div className={styles["home-page__content"]}>
                    <PetViewer
                        pets={paginatedPets}
                        isLoading={isLoading}
                        pageSize={PAGE_SIZE}
                    />

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </main>
        </Wrapper>
    );
};
