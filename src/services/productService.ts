import axiosInstance from "../lib/axios";

// Types
export interface Product {
  prductId: string;
  productName: string;
  productCategory: number;
  productBrand: number;
  productStyle?: number;
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

export const getByProductsFilter = async (
  productCategory: number,
  productBrand: number
): Promise<Product[]> => {
  const response = await axiosInstance.get(
    `/products/get/filter?productCategory=${productCategory}&productBrand=${productBrand}`
  );
  return response.data?.data?.products || [];
};
