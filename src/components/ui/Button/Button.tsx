import { type FC, type ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "danger" | "outlined";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: Variant;
};

const Button: FC<Props> = ({
  className = "",
  variant = "primary",
  ...buttonProps
}) => {
  const variantClass = styles[`button--${variant}`] || "";
  return (
    <button
      className={`${styles.button} ${variantClass} ${className}`}
      {...buttonProps}
    />
  );
};

export default Button;
