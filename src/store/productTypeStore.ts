import { create } from "zustand";

export type ProductType = {
  id: string;
  label: string;
  description: string;
  imgSrc: string;
  createdAt: string;
  updatedAt: string;
  isPresented: "0" | "1";
};
type ProductEditType = {
  id: string;
  label?: string;
  description?: string;
  imgSrc?: string;

  isPresented?: "0" | "1";
};
interface ProductTypeState {
  productTypeList: ProductType[];

  getProductTypeById: (id: string) => ProductType | undefined;
  addProductTypeItem: (productType: ProductType) => void;
  updateProductTypeItem: (productType: ProductEditType) => void;
  setProductTypeList: (productType: ProductType[]) => void;
  deleteProductTypeItem: (id: string) => void;
}

const useProductTypeStore = create<ProductTypeState>((set, get) => ({
  productTypeList: [],
  getProductTypeById: (productTypeId) =>
    get().productTypeList.find(
      (productType) => productType.id === productTypeId
    ),
  addProductTypeItem: (productType) =>
    set((state) => ({
      productTypeList: [...state.productTypeList, productType],
    })),
  updateProductTypeItem: (productType) =>
    set((state) => ({
      productTypeList: state.productTypeList.map((item) =>
        item.id === productType.id ? { ...item, ...productType } : item
      ),
    })),
  setProductTypeList: (productTypeList) =>
    set(() => ({
      productTypeList: productTypeList,
    })),
  deleteProductTypeItem: (id) => {
    set((state) => ({
      productTypeList: state.productTypeList.filter((item) => item.id !== id),
    }));
  },
}));

export default useProductTypeStore;
