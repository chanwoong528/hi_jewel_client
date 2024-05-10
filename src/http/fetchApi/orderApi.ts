import { http } from "../http";

type OrderEditParams = {
  id: string;
  order: number;
};

export const PATCH_productTypeOrder = async (
  orderEditList: OrderEditParams[]
) => {
  try {
    const fetchPatchOrderList = await http.patch("/order/type", {
      orderEditList,
    });
    const data = await fetchPatchOrderList.data;
    return data;
  } catch (error) {
    throw error;
  }
};
