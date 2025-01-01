import { useState, useEffect } from 'react';
import {getProducts} from "../../services/productsService";

export const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    getProducts
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
        })

    return { setProducts, setLoading }
}
