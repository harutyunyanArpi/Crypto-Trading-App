import React from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} />
    </div>
  );
};

export default LoadingSpinner;
