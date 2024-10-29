import { ReactNode } from "react";
interface ActionButtonProps {
  onClick: Function;
  iconComponent: ReactNode;
  css: string
}

export function ActionButton({ onClick, iconComponent, css }: ActionButtonProps) {
  return (
    <>
      <button
        className={css}
        onClick={(_) => onClick()}
      >
        {iconComponent}
      </button>
    </>
  );
}
