import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { fetchPersonById } from "@api/people";
import type { Person } from "@entities/person/person.types.ts";

export const usePerson = (
    id?: number,
    options?: Omit<UseQueryOptions<Person>, "queryKey" | "queryFn">
) => {
    return useQuery<Person>({
        queryKey: ["person", id],
        queryFn: () => fetchPersonById(id!),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        ...options,
    });
};