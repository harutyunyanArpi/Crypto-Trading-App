import { useState, useEffect, type FC } from "react";
import { createPortal } from "react-dom";

import { ButtonVariants } from "@/enums";
import { useAuthStore } from "@/store/authStore";
import type { LoginFormState } from "@/components/LoginModal/LoginModal.types";

import Button from "@/components/ui/Button";

import styles from "./LoginModal.module.scss";

type Props = {
  onCloseLoginModal: () => void;
};

const LoginModal: FC<Props> = ({ onCloseLoginModal }) => {
  const { login } = useAuthStore();

  const [isLoginModalMounted, setIsLoginModalMounted] = useState(false);
  const [loginFormState, setloginFormState] = useState<LoginFormState>({
    email: "",
    password: "",
    error: "",
    isLoading: false,
  });

  // to set the mounted state of the Modal
  useEffect(() => {
    setIsLoginModalMounted(true);
    return () => setIsLoginModalMounted(false);
  }, []);

  const handleChange =
    (field: keyof LoginFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setloginFormState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloginFormState((prev) => ({ ...prev, isLoading: true, error: "" }));

    const result = await login(loginFormState.email, loginFormState.password);

    if (!result.success) {
      setloginFormState((prev) => ({
        ...prev,
        error: result.error || "Login failed",
        isLoading: false,
      }));
      return;
    }

    setloginFormState((prev) => ({ ...prev, error: "", isLoading: false }));
    onCloseLoginModal();
  };

  if (!isLoginModalMounted) return null; // Don't render if modal is closed

  const loginModalContent = (
    <div className={styles.backdrop} onClick={onCloseLoginModal}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onCloseLoginModal}>
          ×
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={loginFormState.email}
            required
            onChange={handleChange("email")}
            className="w-full rounded border p-2"
            disabled={loginFormState.isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginFormState.password}
            required
            onChange={handleChange("password")}
            className="w-full rounded border p-2"
            disabled={loginFormState.isLoading}
          />
          {loginFormState.error && (
            <p className={styles.error}>{loginFormState.error}</p>
          )}
          <Button
            type="submit"
            variant={ButtonVariants.PRIMARY}
            disabled={loginFormState.isLoading}
          >
            {loginFormState.isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return createPortal(loginModalContent, modalRoot);
};

export default LoginModal;
