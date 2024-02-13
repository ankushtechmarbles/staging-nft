// hook to use pagination

import { useEffect, useRef, useState } from "react";
import { useReadyPlayerMe } from "../Hooks/useReadyPlayerMe.hook";

let oldType = "";
let outfitMenuTitles = ["Upper", "Lower", "Footwear", "Headwear"];

export function usePagination(type, gender, itemsPerPage) {
    const [isLoading, setIsLoading] = useState(false);
    const [array, setArray] = useState([]);
    const [pagination, setPagination] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const { queryAssets } = useReadyPlayerMe();

    const getAssets = async (page = 1) => {
        try {
            setIsLoading(true);
            const { data, pagination } = await queryAssets(
                itemsPerPage,
                page,
                type,
                gender,
            );

            // check if type is in outfitMenuTitles
            if (!outfitMenuTitles.includes(type)) {
                data.unshift({
                    id: "",
                    name: "Strike Through",
                    iconUrl:
                        "https://idea-test.readyplayer.me/assets/empty_icon.svg",
                });
            }

            setArray(data);
            setPagination(pagination);

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (oldType !== type) {
            setCurrentPage(1);
        }
        oldType = type;

        getAssets(currentPage);
    }, [type, currentPage]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        if (!pagination?.hasNextPage) return;

        changePage(currentPage + 1);
    };

    const prevPage = () => {
        if (!pagination?.hasPrevPage) return;

        changePage(currentPage - 1);
    };

    return {
        nextPage,
        prevPage,
        currentPage,
        changePage,
        pagination,
        array,
        isLoading,
    };
}
