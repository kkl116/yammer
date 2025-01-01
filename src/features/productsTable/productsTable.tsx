import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {useFetchProducts} from "./productTable.hooks";

const rows: GridRowsProp = [
    { id: 1, col1: 'dummy name', col2: 'dummy description'}
];

const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Product Name', flex: 1 },
    { field: 'col2', headerName: 'Product Description', flex: 1 },
]

export default function ProductsTable() {
    useFetchProducts()
    return <DataGrid
        rows={rows}
        columns={columns}
        editMode={"row"}
    />;
}
