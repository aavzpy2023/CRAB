import { useState, useMemo } from 'react';

/**
 * Headless logic hook for table state management.
 * Strictly enforces React State Fractality separating data manipulation from views.
 * 
 * @param {Array<{id: string, sequence: string, classification: string, probability: number}>} initialData 
 * @returns {object} Table state properties and handlers
 */
export const useTableLogic = (initialData = []) => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({ key: null, direction: 'asc' });
    const [currentPage, setPage] = useState(1);
    
    const ITEMS_PER_PAGE = 13;

    const processedData = useMemo(() => {
        let data = [...initialData];

        // 1. Sequential Search Filter
        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(item => {
                const lowerId = (item.id || '').toLowerCase();
                const derivedClass = lowerId.includes('ncrna') ? 'non-coding' : (lowerId.includes('cds') ? 'coding' : (item.classification || 'unknown'));
                return lowerId.includes(lowerSearch) || derivedClass.toLowerCase().includes(lowerSearch);
            });
        }

        // 2. Sequential Sorting
        if (sort.key) {
            data.sort((a, b) => {
                const valA = a[sort.key];
                const valB = b[sort.key];
                
                if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return data;
    }, [initialData, search, sort]);

    // Calculate total pages guaranteeing at least 1 page bounds
    const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE) || 1;

    // Constrain the internal page state if dataset shrinks from search filtering
    const validPage = Math.max(1, Math.min(currentPage, totalPages));

    // 3. Sequential Pagination Slicing
    const paginatedData = useMemo(() => {
        const start = (validPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return processedData.slice(start, end);
    }, [processedData, validPage]);

    const safeSetPage = (pageNumber) => {
        setPage(Math.max(1, Math.min(pageNumber, totalPages)));
    };

    return {
        paginatedData,
        totalPages,
        currentPage: validPage,
        setPage: safeSetPage,
        search,
        setSearch,
        sort,
        setSort
    };
};
