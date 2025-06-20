import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuthBackUrl } from "@/hooks/useAuthBackUrl";
import { useAuthStore } from "@/store/authStore";

import { ButtonVariants } from "@/enums";

import LoginModal from "@/components/LoginModal";
import UserMenu from "@/components/UserMenu";
import Button from "@/components/ui/Button";

import styles from "./AppHeader.module.scss";

const AppHeader = () => {
  const navigate = useNavigate();
  const { handleAuthBackUrlSet } = useAuthBackUrl();

  const { user } = useAuthStore();
  const isAuthenticated = !!user;

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleProtectedNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAuthenticated) {
      navigate("/trade");
      return;
    }
    e.preventDefault();
    handleAuthBackUrlSet("/trade");
    setShowLoginModal(true);
  };

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.active : "";

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <NavLink to="/" className={getNavClass}>
              Home
            </NavLink>
            <NavLink
              to="/trade"
              className={getNavClass}
              onClick={(e) => handleProtectedNav(e)}
            >
              Trade
            </NavLink>
          </nav>

          <div className={styles.user}>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                variant={ButtonVariants.OUTLINED}
                className={styles.loginBtn}
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {showLoginModal && (
        <LoginModal onCloseLoginModal={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default AppHeader;
