import { SearchIcon } from "lucide-react";
import { useAgentsFilters } from "../../hooks/use-agents-filters";


export const AgentsSearchFilter = () => {
    const [filters, setFilters] = useAgentsFilters();
    return (
        <div className="relative">
            <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                placeholder="Filter by name"
                className="h-9 bg-white w-[200px] pl-7"
            />
            <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"/>
        </div>
    );
}
