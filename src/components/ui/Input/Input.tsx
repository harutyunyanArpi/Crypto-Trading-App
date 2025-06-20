import { type FC, type InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input: FC<Props> = ({ className = "", ...inputProps }) => {
  return (
    <input className={`${styles.cryptoInput} ${className}`} {...inputProps} />
  );
};

export default Input;
