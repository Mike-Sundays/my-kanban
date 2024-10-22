import { useRef, useEffect } from "react";

interface CustomInputProps {
  id: string;
  text: string;
  placeholder?: string;
  onChange: Function;
  type: string;
}

export enum InputTypes {
  CARD_TEXT = "card-text",
  BOARD_TITLE = "board-title",
  COLUMN_TITLE = "column-title",
}

export const CustomInput = ({
  id,
  text,
  placeholder,
  onChange,
  type: location,
}: CustomInputProps) => {
  const ENTER = "Enter";
  const ESCAPE = "Escape";

  const inputRef: React.Ref<any> = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []); // Empty dependency array means this runs only once on mount

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ENTER || event.key === ESCAPE) {
      inputRef.current?.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      className={cssClass(location)}
      type="text"
      value={text}
      placeholder={placeholder}
      onChange={(event) => {
        onChange(id, event.target.value);
      }}
      onKeyDown={(event) => {
        onKeyDown(event);
      }}
    />
  );
};

const cssClass = (location: string): string => {
  switch (location) {
    case InputTypes.CARD_TEXT:
      return "placeholder:text-gray-400 relative z-10 bg-transparent border-none outline-none";
    case InputTypes.BOARD_TITLE:
      return "text-2xl text-gray-200 border-none outline-none m-2.5 font-bold bg-slate-700";
    case InputTypes.COLUMN_TITLE:
      return "mt-2 mb-1 mx-2.5 bg-transparent focus:bg-white px-1 font-bold";
    default:
      return "";
  }
};
