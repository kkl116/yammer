import { GridValidRowModel } from "@mui/x-data-grid";
import { AddProductRequestDto, UpdateProductRequestDto } from "../../services/productService/productServiceDtos";

export function rowToAddProductRequest(row: GridValidRowModel): AddProductRequestDto {
    return {
        name: row.name
    }
}

export function rowToUpdateProductRequest(row: GridValidRowModel): UpdateProductRequestDto {
    return  {
        id: row.productId,
        name: row.name
    }
}
