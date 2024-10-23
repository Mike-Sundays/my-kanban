import { ReactNode } from "react";
interface DeleteButtonProps {
  onClick: Function;
  iconComponent: ReactNode
}

export function DeleteButton({ onClick, iconComponent }: DeleteButtonProps) {
  return (
    <>
      <button 
        className="z-10 flex items-center justify-center mx-3 mt-2 mb-1 size-6 font-bold hover:bg-gray-200 hover:outline-none hover:rounded-full" 
        onClick={(_) => onClick()}
      >
        {iconComponent}
      </button>
    </>
  );
}
