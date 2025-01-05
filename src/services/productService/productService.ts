import { AxiosResponse } from 'axios';
import { bufferClient } from "../../client/axiosClient";
import { AddProductRequestDto, UpdateProductRequestDto } from "./productServiceDtos";

export const getProducts = bufferClient.get('/products');

export const addProduct=
    (payload: AddProductRequestDto): Promise<AxiosResponse<any, any>> => {
    return bufferClient.post('/product', payload);
}

export const updateProduct =
    (productId: number, payload: UpdateProductRequestDto): Promise<AxiosResponse<any, any>> => {
    return bufferClient.put(`/product/${productId}`, payload);
}
