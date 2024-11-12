import useSWR, { mutate } from "swr";
import { fetcher } from "../helper/fetcher";

export const useBasket = () => {
  const { data, error, mutate } = useSWR(
    `${import.meta.env.VITE_API_URL}/basket`,
    fetcher
  );
  const basket = data?.length > 0 ? data : [];

  if (error || !data) {
    return {
      totalPrice: 0,
      total: 0,
      addProduct: () => {},
      isFindProductId: () => {},
      isSomeProduct: () => {},
      basket: [],
      error: error,
    };
  }
  const isFindProductId = (id) => {
    return basket?.find((item) => item.productId === id)?.id;
  };
  const isSomeProduct = (id) => {
    return basket?.some((item) => item.productId === id);
  };

  const removeProduct = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/basket/${id}`, {
      method: "DELETE",
    });
    mutate(
      basket.filter((item) => item.id !== id)
      // { revalidate: false }
    );
  };
  const addProduct = async (product) => {
    if (isSomeProduct(product.productId)) {
      return;
    }
    await fetch(`${import.meta.env.VITE_API_URL}/basket`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    });
    mutate([...basket, product]);
  };

  const totalPrice = basket.reduce((sum, item) => item.price + sum, 0);
  const total = (totalPrice * 5) / 100;
  return {
    removeProduct,
    totalPrice,
    total,
    addProduct,
    isFindProductId,
    isSomeProduct,
    basket,
    error,
  };
};
