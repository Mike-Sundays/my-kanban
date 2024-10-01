import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {ICard} from "../interfaces.ts";
import {Card} from "./Card.tsx";
import {useDroppable} from "@dnd-kit/core";
import {useRef, useEffect} from "react"

export function Column({id, column, index, onTitleChange, onAddCard, onEditCard}) {

  const {setNodeRef} = useDroppable({id: column.id});

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus();  
  }, []); // Empty dependency array means this runs only once on mount


  return (
    <>
      <SortableContext id={id} items={column.cards} strategy={verticalListSortingStrategy}>

        <div
          ref={setNodeRef}
          className={`column`}
          key={index}
        >
          <input
            ref={inputRef}
            type="text"
            value={column.title}
            placeholder={column.placeholder}
            onChange={(event) => onTitleChange(event.target.value, index)}
          />
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
          <button className={"add-card"} onClick={(event) => onAddCard(column, index)}>Add a card</button>
        </div>
      </SortableContext>
    </>
  )
}
