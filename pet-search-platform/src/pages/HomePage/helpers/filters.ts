import type {Pet} from "@entities/pet/pet.types.ts";
import type {ListItem} from "@layouts/TabList/TabList.tsx";

export const filterPets = (pets: Pet[], search?: string , kind?: string) => {
    let result = pets;

    if (search) {
        const lower = search.toLowerCase();
        result = result.filter(
            (p) =>
                p.petName.toLowerCase().includes(lower) ||
                p.description.toLowerCase().includes(lower)
        );
    }

    if (kind) {
        result = result.filter((p) => p.kind === kind);
    }

    return result;
};

export const buildTabItems = (pets: Pet[]): ListItem[] => {
    const counts: Record<string, number> = {};
    pets.forEach((p) => {
        counts[p.kind] = (counts[p.kind] || 0) + 1;
    });
    return Object.entries(counts).map(([label, count]) => ({ label, count }));
};

export const paginatePets = (pets: Pet[], page: number, limit: number): Pet[] => {
    const start = (page - 1) * limit;
    return pets.slice(start, start + limit);
};