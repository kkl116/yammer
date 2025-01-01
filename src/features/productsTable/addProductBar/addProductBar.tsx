import { GridSlotProps, GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddProductBar(props: GridSlotProps) {
    const handleClick = () => {
        setRows((oldRows: Product[]) => {
            const id = oldRows.length + 1;
            return [
                ...oldRows,
                { id, name: '' }
            ]
        })
    }

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add Product
            </Button>
        </GridToolbarContainer>
    );
}
