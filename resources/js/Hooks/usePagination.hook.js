// hook to use pagination

import { useState } from "react";

export function usePagination(array, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);

    const maxPage = Math.ceil(array.length / itemsPerPage);

    const currentItems = array.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const changePage = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, maxPage)));
    };

    const nextPage = () => {
        changePage(currentPage + 1);
    };

    const prevPage = () => {
        changePage(currentPage - 1);
    };

    return {
        nextPage,
        prevPage,
        currentItems,
        currentPage,
        maxPage,
        changePage,
    };
}
