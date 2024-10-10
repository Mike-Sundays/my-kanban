import {
  DndContext,
  DragEndEvent, DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Column } from "../Column/Column.tsx";
import './Board.css';
import { ColumnsContext } from "./columns-context.ts";
import columnsReducer from "./columns-reducer.ts";
import { DEFAULT_COLUMNS } from "./default-columns.ts";
import { ColumnActionsType } from "./column-actions.ts"

const TEXT_PLACEHOLDER = "Write something..."

export function Board() {


  const [columns, dispatch] = useReducer(columnsReducer, DEFAULT_COLUMNS);
  const [lastId, setLastId] = useState(6)


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addCard = (index: number) => {
    dispatch({
      type: ColumnActionsType.ADD_CARD,
      payload: {
        id: uuidv4(),
        text: ``,
        placeholder: TEXT_PLACEHOLDER,
        index
      }
    });
  }
  

  const onEditCard = (id: string, text: string) => {
    dispatch({
      type: ColumnActionsType.EDIT_CARD,
      payload: {
        id: id,
        text: text
      },
    });

  }

  const addColumns = () => {
    dispatch({
      type: ColumnActionsType.ADD_COLUMN,
      payload: {
        id: uuidv4(),
        title: ``,
        placeholder: TEXT_PLACEHOLDER
      }
    });

  }

  const setTitle = (id: string, text: string) => {
    dispatch({
      type: ColumnActionsType.SET_COLUMN_TITLE,
      payload: {
        id: id,
        title: text,
      }
    });
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;

    dispatch({
      type: ColumnActionsType.DRAG_OVER,
      payload: {
        active,
        over,
        delta
      }
    });
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    dispatch({
      type: ColumnActionsType.DRAG_END,
      payload: {
        active,
        over,
      }
    });
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ColumnsContext.Provider value={columns}>
          <div className={"container"}>
            <div className={"columns-container"}>
              {
                columns.map((column, index) => (
                  <Column
                    key={column.id}
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
        </ColumnsContext.Provider>
      </DndContext>

    </>
  )
}
