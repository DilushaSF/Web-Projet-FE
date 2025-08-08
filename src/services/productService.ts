import axiosInstance from "../lib/axios";

// Types
export interface Product {
  productId: string;
  productName: string;
  productCategory: number;
  productBrand: number;
  productStyle: number;
  price: number;
  productDescription: string;
  weight: number;
  status: number;
  images: string[];
}

export interface CategoryType {
  id: number;
  name: string;
}

export interface BrandType {
  id: number;
  name: string;
}

export const getProductById = async (productId: string): Promise<Product> => {
  const response = await axiosInstance.get(`/products/${productId}`);
  console.log("resss dataaa", response.data.data.product);
  return response.data.data.product;
};

export const getByProductsFilter = async (
  productCategory: number,
  productBrand: number
): Promise<Product[]> => {
  const response = await axiosInstance.get(
    `/products/get/filter?productCategory=${productCategory}&productBrand=${productBrand}`
  );
  console.log("res dataa", response.data);
  return response.data?.data?.products || [];
};
