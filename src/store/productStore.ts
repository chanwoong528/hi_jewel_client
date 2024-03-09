import { create } from "zustand";

type Product = {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
  isPresented: "0" | "1";
  typeId: string;
  userId: string;
  updatedAt: string;
  createdAt: string;
};
interface ProductState {
  productList: Product[];
  addProductItem: (productType: Product) => void;
  setProductList: (productType: Product[]) => void;

}

const useProductStore = create<ProductState>((set) => ({
  productList: [],
  addProductItem: (productType) =>
    set((state) => ({
      productList: [...state.productList, productType],
    })),
  setProductList: (productList) =>
    set(() => ({
      productList: productList,
    })),
}));

export default useProductStore;
