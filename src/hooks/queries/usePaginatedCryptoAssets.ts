import { useInfiniteQuery } from "@tanstack/react-query";
import { getCryptoAssets } from "@/services/crypto/cryptoService";
import type { CryptoApiParams } from "@/services/crypto/cryptoService.types";

const DEFAULT_PARAMS: Required<CryptoApiParams> = {
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: 10,
  page: 1,
  sparkline: false,
};

export function usePaginatedCryptoAssets(
  customParams?: Partial<CryptoApiParams>,
) {
  const mergedParams = { ...DEFAULT_PARAMS, ...customParams };

  const query = useInfiniteQuery({
    queryKey: ["crypto-assets", mergedParams],
    queryFn: async ({ pageParam = 1 }) => {
      return await getCryptoAssets({
        ...mergedParams,
        page: pageParam,
      });
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    isError: query.isError,
    error: query.error,
  };
}
