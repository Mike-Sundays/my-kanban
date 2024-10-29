import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ICard } from "../../models/ICard.ts";
import { Card } from "../Card/Card.tsx";
import { useDroppable } from "@dnd-kit/core";
import { CustomInput } from "../CustomInput/CustomInput.tsx";
import { ActionButton } from "../ActionButton/ActionButton.tsx";

import { IColumn } from "../../models/IColumn.ts";
import { useContext } from "react";
import { ColumnsDispatchContext } from "../../shared/columns-context.ts";
import { ENTER, TEXT_PLACEHOLDER } from "../../shared/constants.ts";
import { v4 as uuidv4 } from "uuid";
import { ColumnActionsType } from "../../shared/column-actions.ts";
import { TrashIcon } from "@heroicons/react/16/solid";

interface ColumnProps {
  column: IColumn;
  index: number;
  searchTerm: string;
}

export function Column({ column, index, searchTerm }: ColumnProps) {
  const dispatch = useContext(ColumnsDispatchContext);

  const { setNodeRef } = useDroppable({ id: column.id });

  const onAddCard = (index: number) => {
    dispatch({
      type: ColumnActionsType.ADD_CARD,
      payload: {
        id: uuidv4(),
        text: ``,
        placeholder: TEXT_PLACEHOLDER,
        index,
      },
    });
  };

  const setTitle = (id: string, text: string) => {
    dispatch({
      type: ColumnActionsType.SET_COLUMN_TITLE,
      payload: {
        id: id,
        text: text,
      },
    });
  };

  const onBlurTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === ENTER){
      dispatch({
        type: ColumnActionsType.ADD_CARD,
        payload: {
          id: uuidv4(),
          text: ``,
          placeholder: TEXT_PLACEHOLDER,
          index: index,
        },
      });
    }
  };

  const deleteColumn = (_: React.SyntheticEvent) => {
    dispatch({
      type: ColumnActionsType.DELETE_COLUMN,
      payload: {
        id: column.id,
      },
    });
  };

  const inputCss =
    "mt-2 mb-1 ml-5 mr-2 bg-transparent focus:bg-white pl-1 pr-1.5 placeholder:font-normal font-bold w-9/12";

  const deleteButtonCSS = "z-10 flex items-center justify-center mx-0.5 my-2 size-6 font-bold hover:bg-gray-200 hover:outline-none hover:rounded-full"
  const icon = <TrashIcon className="size-5" />;

  return (
    <>
      <SortableContext
        id={column.id}
        items={column.cards}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="border mx-2 pb-3 border-black border-solid rounded-xl bg-gray-300 flex flex-col justify-between shadow h-fit"
          key={index}
          id={column.id}
        >
          <div className="flex flex-row mt-0.5">
            <CustomInput
              parentId={column.id}
              text={column.title}
              placeholder={column.placeholder}
              onChange={setTitle}
              onBlur={onBlurTitle}
              cssClass={inputCss}
              editable={true}
              toggleable={false}
            ></CustomInput>
            <ActionButton
              onClick={(event: React.SyntheticEvent) => deleteColumn(event)}
              iconComponent={icon}
              css={deleteButtonCSS}
            ></ActionButton>
          </div>

          {column.cards.map((card: ICard) => {
            if (card.visible) {
              return (
                <Card
                  key={card.id}
                  id={card.id}
                  text={card.text}
                  placeholder={card.placeholder}
                  columnIndex={index}
                  editable={card.editable}
                  isFirstEdit={card.isFirstEdit}
                ></Card>
              );
            } else {
              return null;
            }
          })}

          {searchTerm === "" ? (
            <button
              className="cursor-ponter mt-2"
              onClick={(_) => onAddCard(index)}
              disabled={searchTerm !== ""}
            >
              + Add a card
            </button>
          ) : null}
        </div>
      </SortableContext>
    </>
  );
}
