import { http } from "../http";

export const GET_productType = async () => {
  try {
    const fetchProductType = await http.get("/product/type");
    const data = await fetchProductType.data;

    return data;
  } catch (error) {
    console.warn(error);
  }
};
