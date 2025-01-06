import {
    GridRowModes,
    GridSlotProps,
    GridToolbarContainer
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as React from "react";

export default function AddProductBar(props: GridSlotProps['toolbar']) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        //TODO: Fix auto focus row
        setRows((rows) => [
            ...rows,
            { id: rows.length, name: '', productId: '', isNew: true }
        ]);

        setRowModesModel((model) => ({
            ...model,
            [Object.keys(model).length]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add Product
            </Button>
        </GridToolbarContainer>
    );
}
