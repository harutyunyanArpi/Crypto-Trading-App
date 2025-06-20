import { type FC, type KeyboardEvent } from "react";
import { SortDirection, SortField } from "@/enums";

import ChevronDown from "@/assets/images/ChevronDown.svg";
import ChevronUp from "@/assets/images/ChevronUp.svg";

import styles from "./CryptoTableHeaderCell.module.scss";

type Props = {
  field: SortField;
  label: string;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
};

const TableHeaderCell: FC<Props> = ({
  field,
  label,
  sortField,
  sortDirection,
  onSort,
}) => {
  const isActive = sortField === field;
  const directionLabel = isActive
    ? sortDirection === SortDirection.Asc
      ? "ascending"
      : "descending"
    : "none";

  const handleKeyDown = (e: KeyboardEvent<HTMLTableHeaderCellElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSort(field);
    }
  };

  return (
    <th
      className={styles.sortable}
      role="button"
      tabIndex={0}
      aria-sort={directionLabel}
      onClick={() => onSort(field)}
      onKeyDown={handleKeyDown}
    >
      <span>
        {label}
        {isActive && (
          <span>
            {sortDirection === SortDirection.Asc ? (
              <img
                src={ChevronUp}
                alt="Sort ascending"
                className={styles.sortIcon}
              />
            ) : (
              <img
                src={ChevronDown}
                alt="Sort descending"
                className={styles.sortIcon}
              />
            )}
          </span>
        )}
      </span>
    </th>
  );
};

export default TableHeaderCell;
