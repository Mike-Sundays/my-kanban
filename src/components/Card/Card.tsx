import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CustomInput, InputTypes } from "../CustomInput/CustomInput";
import { ColumnsDispatchContext } from "../../shared/columns-context";
import { useContext } from "react";
import { ColumnActionsType } from "../../shared/column-actions";

interface CardProps {
  id: string;
  text: string;
  placeholder?: string;
}

export const Card = ({ id, text, placeholder }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const dispatch = useContext(ColumnsDispatchContext);

  const onEditCard = (id: string, text: string) => {
    dispatch({
      type: ColumnActionsType.EDIT_CARD,
      payload: {
        id: id,
        text: text,
      },
    });
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 my-1 mx-2 relative border border-solid border-gray-500 bg-gray-100 shadow rounded-md"
      key={id}
      id={id}
    >
      <CustomInput
        id={id}
        text={text}
        placeholder={placeholder}
        onChange={onEditCard}
        type={InputTypes.CARD_TEXT}
      />
      {/* Using the button as the draggable part of the card */}
      <button
        className="absolute top-0 left-0 w-full h-full bg-transparent border-none cursor-pointer"
        {...listeners}
        {...attributes}
      ></button>
    </div>
  );
};
