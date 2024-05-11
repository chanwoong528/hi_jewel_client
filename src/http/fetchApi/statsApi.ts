import { checkUserAgent } from "@/utils/utilsFunction";
import { http } from "../http";

export interface StatParam {
  date: string; //key
  type: "visitorCount" | "productClick" | "instaClick";
  productId: string | null;
  userAgent?: string;
}

export enum StatType {
  visitorCount = "visitorCount",
  productClick = "productClick",
  instaClick = "instaClick",
}

export const PATCH_stats = async (stats: StatParam) => {
  try {
    const createStats = await http.patch("/stats", {
      ...stats,
      productId: stats.productId || "noId",
      userAgent: checkUserAgent(),
    });
    const data = await createStats.data;
    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
