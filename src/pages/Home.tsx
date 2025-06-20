import { useState, useMemo } from "react";

import { sortByField } from "@/utils/dataSort";
import { usePaginatedCryptoAssets } from "@/hooks/queries/usePaginatedCryptoAssets";

import type { CryptoAsset } from "@/types/cryptoAsset.types";
import { SortDirection, SortField } from "@/enums";

import CryptoTable from "@/components/CryptoTable";

const HomePage = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    usePaginatedCryptoAssets();

  const [sortBy, setSortBy] = useState(SortField.Name);
  const [sortOrder, setSortOrder] = useState(SortDirection.Asc);

  const flatAssets = useMemo(() => data?.pages.flat() ?? [], [data]);

  const sortedAssets = useMemo(() => {
    const direction = sortOrder === SortDirection.Asc ? "asc" : "desc";
    return sortByField<CryptoAsset>(flatAssets, sortBy, direction);
  }, [flatAssets, sortBy, sortOrder]);

  return (
    <CryptoTable
      assets={sortedAssets}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      sortField={sortBy}
      sortDirection={sortOrder}
      setSortField={setSortBy}
      setSortDirection={setSortOrder}
    />
  );
};

export default HomePage;
