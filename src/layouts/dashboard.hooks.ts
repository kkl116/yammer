import { useEffect, useState } from "react";
import { getProductById } from "../services/productService/productService";

export const useFetchProductName = (
    productId: string | undefined
) => {
    const [productName, setProductName] = useState<string>();
    useEffect(() => {
        if (productId) {
            //get product to get details
            getProductById(Number(productId))
                .then((response) => {
                    setProductName(response.data.name);
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            setProductName(undefined);
        }
    }, [productId])

    return productName
}
