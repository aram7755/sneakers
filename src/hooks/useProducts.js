import useSWR  from "swr";
import { fetcher } from "../helper/fetcher";

export const useProducts = () => {
    const { data, error,isLoading } = useSWR("https://sneakers-back-end.vercel.app/products", fetcher);

    if (error || !data) {

        return {
            products: [],
            error,
            isLoading
        }
    }
    return {
        products: data,
        error,
        isLoading
        
    }
};