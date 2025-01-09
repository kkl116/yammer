import { AxiosResponse } from 'axios';
import { bufferClient } from "../../client/axiosClient";
import { AddProductRequestDto, UpdateProductRequestDto } from "./productServiceDtos";

export const getProducts = bufferClient.get('/products');

export const getProductById = (id: number) => {
    return bufferClient.get(`/product/${id}`)
}

export const addProduct=
    (payload: AddProductRequestDto): Promise<AxiosResponse<any, any>> => {
    return bufferClient.post('/product', payload);
}

export const updateProduct =
    (id: number, payload: UpdateProductRequestDto): Promise<AxiosResponse<any, any>> => {
    return bufferClient.put(`/product/${id}`, payload);
}

export const deleteProduct =
    (id: number): Promise<AxiosResponse<any, any>> => {
    return bufferClient.delete(`/product/${id}`)
}
