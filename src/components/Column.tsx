import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {ICard} from "../interfaces.ts";
import {Card} from "./Card.tsx";
import {useDroppable} from "@dnd-kit/core";

export function Column({id, column, index, onTitleChange}) {

  const {setNodeRef} = useDroppable({id: column.id});

  return (
    <SortableContext id={id} items={column.cards} strategy={verticalListSortingStrategy}>

      <div
        ref={setNodeRef}
        className={`column`}
        key={index}
      >
        <input
          type="text"
          value={column.title}
          onChange={(event) => onTitleChange(event.target.value, index)}
        />
        {
          column.cards.map((card: ICard) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.text}
            >
            </Card>
          ))

        }

      </div>
    </SortableContext>

  )
}
