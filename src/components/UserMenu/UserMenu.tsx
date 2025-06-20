import { useState, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import styles from "./UserMenu.module.scss";
import userIcon from "@/assets/images/user.svg";

export default function UserMenu() {
  const { user, logout } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(userMenuRef, () => setMenuOpen(false));

  const handleToggleUserMenu = () => setMenuOpen((prev) => !prev);

  if (!user) return null;

  return (
    <div className={styles.avatarWrapper} ref={userMenuRef}>
      <button className={styles.avatarButton} onClick={handleToggleUserMenu}>
        <img src={userIcon} alt="User Icon" className={styles.userIcon} />
      </button>
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <div className={`${styles.dropdownItem} ${styles.nonInteractive}`}>
            {user.email}
          </div>
          <hr className={styles.dropdownDivider} />
          <button onClick={logout} className={styles.dropdownItem}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
