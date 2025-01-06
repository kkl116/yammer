import { useEffect, Dispatch, SetStateAction } from 'react';
import { getProducts } from "../../services/productService/productService";
import {GridRowModes, GridRowModesModel, GridRowsProp} from "@mui/x-data-grid";
import { Product } from "../../common/models";
import {GridRowId} from "@mui/x-data-grid/models/gridRows";
import {GridRowModesModelProps} from "@mui/x-data-grid/models/api/gridEditingApi";


export const useFetchProducts = (
    setRows: Dispatch<SetStateAction<GridRowsProp>>,
    setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>
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

                const rowModesModel: Record<GridRowId, GridRowModesModelProps> = data.reduce(
                    (acc, _, index) => {
                        acc[index] = { mode: GridRowModes.View };
                        return acc;
                    }, {} as Record<GridRowId, GridRowModesModelProps>);

                setRows(rows);
                setRowModesModel(rowModesModel);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
}
