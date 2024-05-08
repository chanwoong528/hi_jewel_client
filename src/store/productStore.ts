import { create } from "zustand";

export type Product = {
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
type ProductEditType = {
  id: string;
  title?: string;
  description?: string;
  imgSrc?: string;
  isPresented?: "0" | "1";
  typeId?: string;
};

interface ProductState {
  productList: Product[];
  addProductItem: (productType: Product) => void;
  updateProductItem: (productType: ProductEditType) => void;
  setProductList: (productType: Product[]) => void;
  deleteProductItem: (id: string) => void;
}

const useProductStore = create<ProductState>((set) => ({
  productList: [],
  addProductItem: (productType) =>
    set((state) => ({
      productList: [...state.productList, productType],
    })),
  updateProductItem: (productType) =>
    set((state) => ({
      productList: state.productList.map((item) =>
        item.id === productType.id ? { ...item, ...productType } : item
      ),
    })),
  setProductList: (productList) =>
    set(() => ({
      productList: productList,
    })),
  deleteProductItem: (id) => {
    set((state) => ({
      productList: state.productList.filter((item) => item.id !== id),
    }));
  },
}));

export default useProductStore;
