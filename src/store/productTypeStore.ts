import { create } from "zustand";

type ProductType = {
  id: string;
  label: string;
  description: string;
  imgSrc: string;
  createdAt: string;
  updatedAt: string;
};
interface ProductTypeState {
  productTypeList: ProductType[];

  getProductTypeById: (id: string) => ProductType | undefined;
  addProductTypeItem: (productType: ProductType) => void;
  setProductTypeList: (productType: ProductType[]) => void;
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
  setProductTypeList: (productTypeList) =>
    set(() => ({
      productTypeList: productTypeList,
    })),
}));

export default useProductTypeStore;
