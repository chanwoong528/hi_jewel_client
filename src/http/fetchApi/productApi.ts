import { http } from "../http";
interface ProductTypeParam {
  label: string;
  description: string;
  image: File;
}
interface ProductTypeEditParam {
  label?: string;
  description?: string;
  image?: File;
  isPresented?: "0" | "1";
}
interface ProductParam {
  title: string;
  description: string;
  image: File;
  typeId: string;
}
interface ProductEditParam {
  title?: string;
  description?: string;
  image?: File;
  typeId?: string;
  isPresented?: "0" | "1";
}

export const GET_productType = async () => {
  try {
    const fetchProductType = await http.get("/product/type");
    const data = await fetchProductType.data;

    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const POST_productType = async (productType: ProductTypeParam) => {
  const formData = new FormData();

  Object.keys(productType).forEach((key) => {
    // @ts-ignore
    formData.append(key, productType[key]);
  });
  try {
    const createProductType = await http.post("/product/type", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await createProductType.data;
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const PATCH_productType = async (
  id: string,
  productType: ProductTypeEditParam
) => {
  const formData = new FormData();
  Object.keys(productType).forEach((key) => {
    // @ts-ignore
    formData.append(key, productType[key]);
  });

  try {
    const patchProductType = await http.patch(`/product/type/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await patchProductType.data;
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const DELETE_productType = async (productTypeId: string) => {
  try {
    const fetchDeleteProduct = await http.delete(
      `/product/type/${productTypeId}`
    );

    return fetchDeleteProduct;
  } catch (error) {
    throw error;
    console.warn(error);
  }
};

export const GET_Product = async () => {
  try {
    const fetchProduct = await http.get("/product");
    const data = await fetchProduct.data;
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const POST_Product = async (product: ProductParam) => {
  try {
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      // @ts-ignore
      formData.append(key, product[key]);
    });
    const createProduct = await http.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await createProduct.data;
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const PATCH_product = async (id: string, product: ProductEditParam) => {
  const formData = new FormData();
  Object.keys(product).forEach((key) => {
    // @ts-ignore
    formData.append(key, product[key]);
  });

  try {
    const patchProduct = await http.patch(`/product/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await patchProduct.data;
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const DELETE_product = async (productId: string) => {
  try {
    const fetchDeleteProduct = await http.delete(`/product/${productId}`);

    return fetchDeleteProduct;
  } catch (error) {
    console.warn(error);
  }
};
