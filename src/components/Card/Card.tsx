import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CustomInput } from "../CustomInput/CustomInput";
import { ColumnsDispatchContext } from "../../shared/columns-context";
import React, { useContext, useRef } from "react";
import { ColumnActionsType } from "../../shared/column-actions";
import { ENTER, TEXT_PLACEHOLDER } from "../../shared/constants.ts";
import { v4 as uuidv4 } from "uuid";
import { ActionButton } from "../ActionButton/ActionButton.tsx";
import { PencilIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useClickOutside } from "../../hooks/useClickOutside.ts";

interface CardProps {
  id: string;
  text: string;
  placeholder?: string;
  columnIndex: number;
  editable: boolean;
  isFirstEdit: boolean;
}

export const Card = ({
  id,
  text,
  placeholder,
  columnIndex,
  editable,
  isFirstEdit,
}: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);

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

  const onBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ENTER && isFirstEdit && text !== '') {
      dispatch({
        type: ColumnActionsType.ADD_CARD,
        payload: {
          id: uuidv4(),
          text: ``,
          placeholder: TEXT_PLACEHOLDER,
          index: columnIndex,
        },
      });
    }
    toggleInput(event);
  };

  const deleteCard = (_: React.SyntheticEvent) => {
    dispatch({
      type: ColumnActionsType.DELETE_CARD,
      payload: {
        id: id,
      },
    });
  };

  const toggleInput = (_: React.SyntheticEvent) => {
    dispatch({
      type: ColumnActionsType.TOGGLE_CARD_EDIT,
      payload: {
        id: id,
      },
    });
  };

  useClickOutside(toggleInput);

  const inputCss =
    "placeholder:text-gray-400 relative z-10 bg-transparent border-none outline-none";

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const crossIcon = <XCircleIcon className="size-5" />;
  const pencilIcon = <PencilIcon className="size-5" />;

  const cardBorder = editable
    ? "outline outline-gray-900"
    : "border border-solid border-gray-500";

  const actionButtonCSS =
    "z-20 flex items-center justify-center mx-0.5 my-1 size-7 font-bold hover:bg-gray-200 hover:outline-none hover:rounded-full";

  const pencilCSS = editable
    ? actionButtonCSS + " hover:bg-slate-400 bg-slate-300 rounded-full"
    : actionButtonCSS;

  const dragButtonCSS = `absolute top-0 left-0 w-full h-full bg-transparent border-none cursor-pointer ${!editable ? "z-10" : ""}`;

  return (
    <div ref={ref}>
      <div
        ref={setNodeRef}
        style={style}
        className={`flex justify-between py-4 pl-4 pr-2 my-1 mx-4 relative bg-gray-100 shadow rounded-md ${cardBorder}`}
        key={id}
        id={id}
      >
        <CustomInput
          parentId={id}
          text={text}
          placeholder={placeholder}
          onChange={onEditCard}
          onBlur={onBlur}
          editable={editable}
          cssClass={inputCss}
          toggleable={true}
        />
        <div className="flex ">
          <ActionButton
            onClick={(event: React.SyntheticEvent) => toggleInput(event)}
            iconComponent={pencilIcon}
            css={pencilCSS}
          ></ActionButton>
          <ActionButton
            onClick={(event: React.SyntheticEvent) => deleteCard(event)}
            iconComponent={crossIcon}
            css={actionButtonCSS}
          ></ActionButton>
        </div>

        {/* Using the button as the draggable part of the card */}
        <button
          className={dragButtonCSS}
          {...listeners}
          {...attributes}
        ></button>
      </div>
    </div>
  );
};
