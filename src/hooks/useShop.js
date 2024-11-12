import useSWR, { mutate } from "swr";
import { fetcher } from "../helper/fetcher";
import { useSWRConfig } from "swr";
export const useShop = () => {
  const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/shop`,
    fetcher
  );
  const shop = data?.length > 0 ? data?.map((obj) => Object.values(obj)) : [];
  if (error || !data) {
    return {
      shopProductsLength: 0,
      addShop: () => {},
      shop: [],
      error: error,
    };
  }
  const addShop = async (product) => {
    await fetch(`${import.meta.env.VITE_API_URL}/shop`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...product }),
    }),
      mutate(`${import.meta.env.VITE_API_URL}/shop`, [
        ...shop,
        {
          ...product,
        },
      ]);

    product?.forEach(async (obj) => {
      await fetch(`${import.meta.env.VITE_API_URL}/basket/${obj.id}`, {
        method: "DELETE",
      }),
        mutate(`${import.meta.env.VITE_API_URL}/basket`, []);
    });
  };

  const shopProductsLength = shop.length;
  return {
    shopProductsLength,
    addShop,
    shop,
    isLoading,
    error,
  };
};
