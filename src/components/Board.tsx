import React, {useState} from "react";
import {IColumn} from "../interfaces.ts";
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {
  closestCorners,
  DndContext,
  DragEndEvent, DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {Column} from "./Column.tsx";
import {v4 as uuidv4} from 'uuid';


// @ts-ignore
export const BoardContext = React.createContext();

export function Board() {
  const [columns, setColumns] = useState<IColumn[]>([
    {id: uuidv4(), title: "Column 1", cards: [{id: uuidv4(), text: "Card 1"}, {id: uuidv4(), text: "Card 2"}]},
    {id: uuidv4(), title: "Column 2", cards: [{id: uuidv4(), text: "Card 1"}, {id: uuidv4(), text: "Card 2"}]},
    {id: uuidv4(), title: "Column 3", cards: [{id: uuidv4(), text: "Card 1"}, {id: uuidv4(), text: "Card 2"}]},
  ])
  const [lastId, setLastId] = useState(6)


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addCard = (column, index) => {
    const newCard = {id: uuidv4() , text: ``, placeholder: `Write something...`}
    const newColumns = [...columns]
    newColumns[index].cards.push(newCard)
    setColumns(newColumns)
    setLastId(lastId + 1)
  }

  const onEditCard = (id, text) => {
    const newColumns = columns.map(column => {
      column.cards = column.cards.map(card => {
        if (card.id === id) {
          card.text = text
        }
        return card
      })
      return column
    })
    setColumns(newColumns)
  }

  const addColumns = () => {
    const id = uuidv4()
    setColumns([...columns, {
      id: id,
      title: ``,
      cards: [],
      placeholder: 'Write something...'
    }])
  }

  const setTitle = (title: string, index: number) => {
    const newColumns = [...columns]
    newColumns[index].title = title
    setColumns(newColumns)
  }

  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null;
    }
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({itemId: i.id, columnId: columnId}));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const {active, over, delta} = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length)
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        });
      });
    }
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className={"container"}>
            <div className={"columns-container"}>
              {
                columns.map((column: IColumn, index) => (
                  <Column
                    id={column.id}
                    key={column.id}
                    column={column}
                    index={index}
                    onTitleChange={setTitle}
                    onAddCard={addCard}
                    onEditCard={onEditCard}>
                  </Column>
                ))
              }
          </div>
          <button className={"add-column-button"} onClick={addColumns}>Add column</button>
        </div>
      </DndContext>

    </>
  )
}
