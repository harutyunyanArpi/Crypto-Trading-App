import { useState, useRef, type FC } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import styles from "./ActionMenu.module.scss";

type Action = {
  label: string;
  onClick: () => void;
};

type Props = {
  actions: Action[];
};

const ActionMenu: FC<Props> = ({ actions }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setOpen(false));

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <div className={styles.menuWrapper} ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={styles.menuButton}
        aria-label="Open actions menu"
      >
        ⋮
      </button>
      {open && (
        <div className={styles.menuDropdown}>
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                setOpen(false);
              }}
              className={styles.menuItem}
              type="button"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
