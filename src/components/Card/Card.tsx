import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CustomInput } from "../CustomInput/CustomInput";
import { ColumnsDispatchContext } from "../../shared/columns-context";
import { useContext } from "react";
import { ColumnActionsType } from "../../shared/column-actions";
import { TEXT_PLACEHOLDER } from "../../shared/constants.ts";
import { v4 as uuidv4 } from "uuid";
import { DeleteButton } from "../DeleteButton/DeleteButton.tsx";
import { XCircleIcon } from "@heroicons/react/16/solid";

interface CardProps {
  id: string;
  text: string;
  placeholder?: string;
  columnIndex: number;
}

export const Card = ({ id, text, placeholder, columnIndex }: CardProps) => {
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

  const onBlur = (event: Event) => {
    dispatch({
      type: ColumnActionsType.ADD_CARD,
      payload: {
        id: uuidv4(),
        text: ``,
        placeholder: TEXT_PLACEHOLDER,
        index: columnIndex,
      },
    });
  };

  const deleteCard = (event: Event) => {
    dispatch({
      type: ColumnActionsType.DELETE_CARD,
      payload: {
        id: id,
      },
    });
  };

  const inputCss =
    "placeholder:text-gray-400 relative z-10 bg-transparent border-none outline-none";

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const icon = <XCircleIcon className="size-5" />;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex justify-between py-4 pl-4 my-1 mx-4 relative border border-solid border-gray-500 bg-gray-100 shadow rounded-md"
      key={id}
      id={id}
    >
      <CustomInput
        parentId={id}
        text={text}
        placeholder={placeholder}
        onChange={onEditCard}
        onBlur={onBlur}
        cssClass={inputCss}
      />
      <DeleteButton
        onClick={(event: Event) => deleteCard(event)}
        iconComponent={icon}
      ></DeleteButton>
      {/* Using the button as the draggable part of the card */}
      <button
        className="absolute top-0 left-0 w-full h-full bg-transparent border-none cursor-pointer"
        {...listeners}
        {...attributes}
      ></button>
    </div>
  );
};
