import axios from "axios";
import type { CryptoApiParams } from "@/services/crypto/cryptoService.types";
import type { CryptoAsset } from "@/types/cryptoAsset.types";

const API_URL = import.meta.env.VITE_API_URL as string;

export const getCryptoAssets = async (
  params: CryptoApiParams,
): Promise<CryptoAsset[]> => {
  if (!params) return [];

  try {
    const searchParams = new URLSearchParams({
      vs_currency: params.vs_currency,
      order: params.order,
      per_page: String(params.per_page),
      page: String(params.page),
      sparkline: String(params.sparkline),
    });

    const API = `${API_URL}?${searchParams.toString()}`;
    const response = await axios.get(API);

    return response.data.map((item: CryptoAsset) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      current_price: item.current_price,
      image: item.image,
    }));
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};
