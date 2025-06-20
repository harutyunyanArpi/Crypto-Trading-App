import { type FC, type SelectHTMLAttributes } from "react";
import styles from "./Select.module.scss";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

const Select: FC<Props> = ({ className, children, ...selectProps }) => {
  return (
    <select
      {...selectProps}
      className={`${styles.cryptoSelect} ${className || ""}`}
    >
      {children}
    </select>
  );
};

export default Select;
