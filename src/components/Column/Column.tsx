import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ICard } from "../../models/ICard.ts";
import { Card } from "../Card/Card.tsx";
import { useDroppable } from "@dnd-kit/core";
import { CustomInput, InputTypes } from "../CustomInput/CustomInput.tsx";
import { IColumn } from "../../models/IColumn.ts";
import { useContext } from "react";
import { ColumnsDispatchContext } from "../../shared/columns-context.ts";
import { TEXT_PLACEHOLDER } from "../../shared/constants.ts";
import { v4 as uuidv4 } from "uuid";
import { ColumnActionsType } from "../../shared/column-actions.ts";

interface ColumnProps {
  column: IColumn;
  index: number;
}

export function Column({ column, index }: ColumnProps) {
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

  const onBlurTitle = (event: Event) => {
    dispatch({
      type: ColumnActionsType.ADD_CARD,
      payload: {
        id: uuidv4(),
        text: ``,
        placeholder: TEXT_PLACEHOLDER,
        index: index
      },
    });
  };


  return (
    <>
      <SortableContext
        id={column.id}
        items={column.cards}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="border mx-2 border-black border-solid rounded-xl bg-gray-300 flex flex-col shadow h-fit"
          key={index}
          id={column.id}
        >
          <CustomInput
            parentId={column.id}
            text={column.title}
            placeholder={column.placeholder}
            onChange={setTitle}
            onBlur={onBlurTitle}
            type={InputTypes.COLUMN_TITLE}
          ></CustomInput>

          {column.cards.map((card: ICard) => (
            <Card
              key={card.id}
              id={card.id}
              text={card.text}
              placeholder={card.placeholder}
              columnIndex={index}
            ></Card>
          ))}
          <button className="cursor-ponter my-2" onClick={(_) => onAddCard(index)}>
            + Add a card
          </button>
        </div>
      </SortableContext>
    </>
  );
}
