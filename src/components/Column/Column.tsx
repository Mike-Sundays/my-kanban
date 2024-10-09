import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {ICard} from "../../models/ICard.ts";
import {Card} from "../Card/Card.tsx";
import {useDroppable} from "@dnd-kit/core";
import { CustomInput } from "../CustomInput/CustomInput.tsx";
import { IColumn } from "../../models/IColumn.ts";
import { useContext } from "react";
import { ColumnsContext } from "../Board/columns-context.ts";

interface ColumnProps {
  index: number,
  onTitleChange: Function
  onAddCard: Function
  onEditCard: Function
}
export function Column({index, onTitleChange, onAddCard, onEditCard} : ColumnProps) {

  const columns: IColumn[] = useContext(ColumnsContext)
  const column: IColumn = columns[index]
  
  const {setNodeRef} = useDroppable({id: column.id});

  return (
    <>
      <SortableContext id={column.id} items={column.cards} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`column`}
          key={index}
          id={column.id}
        >
          <CustomInput
            id={column.id}
            text={column.title}
            placeholder={column.placeholder}
            onChange={onTitleChange}
          >
          </CustomInput>

          {column.cards.map((card: ICard) => (
            <Card
              key={card.id}
              id={card.id}
              text={card.text}
              placeholder={card.placeholder}
              onEditCard={onEditCard}
            >
            </Card>
          ))}
          <button className={"add-card"} onClick={(event) => onAddCard(index)}>Add a card</button>
        </div>
      </SortableContext>
    </>
  )
}
