import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    useGridApiRef,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import AddProductBar from "./addProductBar/addProductBar";
import { useFetchProducts } from "./productTable.hooks";
import {rowToAddProductRequest, rowToUpdateProductRequest} from "./productTable.transformer";
import { addProduct, updateProduct } from "../../services/productService/productService";
import {AxiosResponse} from "axios";

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
        setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
    }
}

export default function ProductTable() {
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    //fetch products on init
    useFetchProducts(setRows);

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        //use gridApiRef to delete the row
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
        //we should do save and update row here because we have access to the newRow values
        //check if the productId field is populated - if it's not it's a save operation
        console.log(newRow);

        let request: Promise<AxiosResponse<any, any>> = newRow.productId
            ? updateProduct(newRow.productId, rowToUpdateProductRequest(newRow))
            : addProduct(rowToAddProductRequest(newRow))

        return request
            .then((response) => {
                const updatedRow = {
                    ...newRow,
                    productId: newRow.productId ? newRow.productId : response.data.id,
                    isNew: false
                };

                setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
                return updatedRow;
            })
            .catch((error) => {
                console.log(error);
                return oldRow;
            })
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'productId', headerName: 'Product ID', flex: 1, editable: false},
        { field: 'name', headerName: 'Name', flex: 5, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            editMode={"row"}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{ toolbar: AddProductBar }}
            slotProps={{
                toolbar: { setRows, setRowModesModel },
            }}
        />
    );
}
