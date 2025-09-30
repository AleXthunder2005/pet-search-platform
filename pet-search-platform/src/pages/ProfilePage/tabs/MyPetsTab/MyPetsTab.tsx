import { useState, useMemo } from "react";
import { useAuth } from "@app/contexts/authContext.tsx";
import { useMyPets } from "@hooks/useMyPets.ts";
import { Pagination } from "@components/Pagination/Pagination";
import { paginatePets } from "@pages/HomePage/helpers/filters.ts";
import { notify } from "@layouts/GlobalNotificationContainer/GlobalNotificationContainer.tsx";
import { AboutPetModal } from "@layouts/AboutPetModal";
import { PetsViewer } from "@layouts/PetsViewer";
import { Button } from "@components/Button";
import { AddPetModal } from "@layouts/AddPetModal";
import type { Pet } from "@entities/pet/pet.types.ts";
import styles from "./styles/MyPetsTab.module.scss";

const PAGE_SIZE = 6;

export const MyPetsTab = () => {
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const { user } = useAuth();
    const personId = user?.id;
    const { data: myPets = [], isLoading, isError, refetch } = useMyPets(personId);
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(myPets.length / PAGE_SIZE));
    const paginatedPets = useMemo(
        () => paginatePets(myPets, page, PAGE_SIZE),
        [myPets, page]
    );

    if (isError) {
        notify("Не удалось загрузить ваших питомцев. Попробуйте позже.", "error");
    }

    return (
        <div className={styles["pets"]}>
            <PetsViewer
                pets={paginatedPets}
                isLoading={isLoading}
                pageSize={PAGE_SIZE}
                onPetClick={setSelectedPet}
            />

            <div className={styles["pets__actions"]}>
                {!!myPets.length && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}

                <Button
                    isPrimary
                    className={styles["pets__add-btn"]}
                    onClick={() => setIsAddOpen(true)}
                >
                    Разместить объявление
                </Button>
            </div>

            <AboutPetModal
                pet={selectedPet || undefined}
                isOpen={!!selectedPet}
                onClose={() => setSelectedPet(null)}
            />

            <AddPetModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSuccess={() => refetch()}
            />
        </div>
    );
};
