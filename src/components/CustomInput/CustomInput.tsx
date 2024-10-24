import { useRef, useEffect } from "react";
import { ENTER, ESCAPE } from "../../shared/constants";

interface CustomInputProps {
  parentId: string;
  text: string;
  placeholder?: string;
  onChange: Function;
  onBlur?: Function;
  cssClass: string;
}

export enum InputTypes {
  CARD_TEXT = "card-text",
  BOARD_TITLE = "board-title",
  COLUMN_TITLE = "column-title",
}

export const CustomInput = ({
  parentId,
  text,
  placeholder,
  onChange,
  onBlur = () => {},
  cssClass,
}: CustomInputProps) => {

  const inputRef: React.Ref<any> = useRef(null);

  useEffect(() => {
    if(text === ''){
      inputRef.current?.focus();
    }
  }, []); // Empty dependency array means this runs only once on mount

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ( event.key === ESCAPE) {
      inputRef.current?.blur();
    } else if(event.key === ENTER){
      inputRef.current?.blur();
      onBlur()
    }
  };

  return (
    <input
      ref={inputRef}
      className={cssClass}
      type="text"
      value={text}
      placeholder={placeholder}
      onChange={(event) => {
        onChange(parentId, event.target.value);
      }}
      onKeyDown={(event) => {
        onKeyDown(event);
      }}
    />
  );
};

