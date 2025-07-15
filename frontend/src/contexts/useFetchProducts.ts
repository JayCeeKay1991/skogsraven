import { getProducts } from "../services/product-service";
import { ProductType } from "../types/types";
import { useEffect, useState } from "react";

const useFetchProducts = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        setProductList(allProducts);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An unknown error occurred. Sorry!";
        setError(errorMessage);
      }
    };
    fetchProducts();
  }, []);

  return { productList, error };
};

export default useFetchProducts;
