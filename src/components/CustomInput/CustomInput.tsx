import { useRef, useEffect } from "react";
import { ENTER, ESCAPE } from "../../shared/constants";

interface CustomInputProps {
  parentId: string;
  text: string;
  placeholder?: string;
  onChange: Function;
  onBlur?: Function;
  cssClass: string;
  editable: boolean;
  toggleable: boolean;
}

export const CustomInput = ({
  parentId,
  text,
  placeholder,
  onChange,
  onBlur = () => {},
  cssClass,
  editable,
  toggleable,
}: CustomInputProps) => {
  const inputRef: React.Ref<any> = useRef(null);

  useEffect(() => {
    if ((text === "" || editable === true) && toggleable) {
      inputRef.current?.focus();
    }
  }, [editable]); // Empty dependency array means this runs only once on mount

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ESCAPE) {
      inputRef.current?.blur();
    }
    if (event.key === ENTER) {
      onBlur(event);
    }
  };

  return (
    <input
      ref={inputRef}
      className={cssClass}
      type="text"
      value={text}
      disabled={!editable}
      placeholder={placeholder}
      onChange={(event) => {
        onChange(parentId, event.target.value);
      }}
      onKeyDown={(event) => {
        onKeyDown(event);
      }}
      onBlur={(event) => {
        onBlur(event);
      }}
    />
  );
};
