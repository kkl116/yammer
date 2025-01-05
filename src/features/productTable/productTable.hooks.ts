import { useEffect, Dispatch, SetStateAction } from 'react';
import { getProducts } from "../../services/productService/productService";
import { GridRowsProp } from "@mui/x-data-grid";
import { Product } from "../../common/models";


export const useFetchProducts = (
    setRows: Dispatch<SetStateAction<GridRowsProp>>
) => {
    useEffect(() => {
        getProducts
            .then((response) => {
                const data: Product[] = response.data;
                const rows: GridRowsProp = data.map((product, index) => ({
                    productId: product.id,
                    name: product.name,
                    id: index
                }));
                setRows(rows);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
}
