import React, { type ErrorInfo, type ReactNode } from "react";
import { ButtonVariants } from "@/enums";

import Button from "@/components/ui/Button";

import styles from "./ErrorBoundary.module.scss";

type Props = { children?: ReactNode };
type State = { hasError: boolean; error?: Error };

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const message = this.state.error?.message || "Something went wrong.";
      return (
        <div className={styles.errorBoundary}>
          <h2>Oops!</h2>
          <p>{message}</p>
          <Button variant={ButtonVariants.PRIMARY} onClick={this.handleReload}>
            Reload
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
