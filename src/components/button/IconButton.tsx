import { ReactElement } from "react";
import styles from "./styles.module.scss";

type IconButtonProps = {
  children?: any;
  icon: ReactElement<any, any>;
  onClick?: any;
  disabled?: boolean;
};

export const IconButton = ({
  children,
  icon,
  onClick,
  disabled,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles["icon-button"]}
    >
      {icon}
      {children}
    </button>
  );
};
