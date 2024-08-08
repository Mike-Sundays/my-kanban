import {useState} from "react";
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

export function Board() {
  const [columns, setColumns] = useState<IColumn[]>([
    {id: "a", title: "Column 1", cards: [{id: "1", text: "Card 1"}, {id: "2", text: "Card 2"}]},
    {id: "b", title: "Column 2", cards: [{id: "3", text: "Card 3"}, {id: "4", text: "Card 4"}]},
    {id: "c", title: "Column 3", cards: [{id: "5", text: "Card 5"}, {id: "6", text: "Card 6"}]},
  ])


  const addColumns = () => {
    const id = columns.length + 1
    setColumns([...columns, {
      id: id.toString(),
      title: `Column ${id}`,
      cards: []
    }])
  }

  const setTitle = (title: string, index: number) => {
    const newColumns = [...columns]
    newColumns[index].title = title
    setColumns(newColumns)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
                  onTitleChange={setTitle}>
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
