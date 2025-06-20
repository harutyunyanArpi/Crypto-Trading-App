import { type FC } from "react";

import { SortDirection, SortField, ButtonVariants } from "@/enums";
import type { CryptoAsset } from "@/types/cryptoAsset.types";

import CryptoTableHeaderCell from "@/components/CryptoTableHeaderCell";
import CryptoTableRow from "@/components/CryptoTableRow";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import styles from "./CryptoTable.module.scss";

type Props = {
  assets: CryptoAsset[];
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  sortField: SortField;
  sortDirection: SortDirection;
  setSortField: (field: SortField) => void;
  setSortDirection: (dir: SortDirection) => void;
};

const CryptoTable: FC<Props> = ({
  assets,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
}) => {
  const onSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(
        sortDirection === SortDirection.Asc
          ? SortDirection.Desc
          : SortDirection.Asc,
      );
    } else {
      setSortField(field);
      setSortDirection(SortDirection.Asc);
    }
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <CryptoTableHeaderCell
              field={SortField.Name}
              label="Name"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <CryptoTableHeaderCell
              field={SortField.Price}
              label="Price (USD)"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <th>Buy/Sell</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3}>
                <LoadingSpinner />
              </td>
            </tr>
          ) : assets.length === 0 ? (
            <tr>
              <td colSpan={3} className={styles.noDataContainer}>
                No data available.
              </td>
            </tr>
          ) : (
            assets.map((asset) => (
              <CryptoTableRow key={asset.id} asset={asset} />
            ))
          )}
        </tbody>
      </table>

      {hasNextPage && (
        <Button
          variant={ButtonVariants.PRIMARY}
          className={styles.loadMore}
          onClick={fetchNextPage}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Show More"}
        </Button>
      )}
    </div>
  );
};

export default CryptoTable;
