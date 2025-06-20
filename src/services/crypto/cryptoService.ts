import axios, { type AxiosResponse } from "axios";
import type { CryptoAsset } from "@/types/cryptoAsset.types";
import type { CryptoApiParams } from "./cryptoService.types";

const API_URL = import.meta.env.VITE_API_URL as string;

export const getCryptoAssets = async (
  params: CryptoApiParams,
): Promise<AxiosResponse<CryptoAsset[]>> => {
  return await axios.get<CryptoAsset[]>(API_URL, { params });
};
