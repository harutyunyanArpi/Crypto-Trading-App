import { useQuery } from "@tanstack/react-query";
import { getCryptoAssets } from "@/services/crypto/cryptoService";
import type { CryptoApiParams } from "@/services/crypto/cryptoService.types";

const DEFAULT_PARAMS: Required<CryptoApiParams> = {
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: 100,
  page: 1,
  sparkline: false,
};

export function useAllCryptoAssets(customParams?: Partial<CryptoApiParams>) {
  const mergedParams = { ...DEFAULT_PARAMS, ...customParams };

  const query = useQuery({
    queryKey: ["crypto-assets", "all"],
    queryFn: async () => {
      const response = await getCryptoAssets(mergedParams);
      return { pages: [response.data] };
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetchingNextPage: false,
    hasNextPage: false,
    fetchNextPage: () => {},
    isError: query.isError,
    error: query.error,
  };
}
