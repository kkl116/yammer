import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getProducts } from "../../services/productsService";
import { GridRowsProp } from "@mui/x-data-grid";


export const useFetchProducts = (
    setRows: Dispatch<SetStateAction<GridRowsProp>>
) => {

    useEffect(() => {
        getProducts
            .then((response) => {
                const data: Product[] = response.data;
                const rows: GridRowsProp = data.map((product, index) => ({
                    ...product,
                    id: index
                }));
                setRows(rows);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
}
