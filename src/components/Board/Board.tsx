import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Column } from "../Column/Column.tsx";
import "./Board.css";
import { ColumnsDispatchContext } from "../../shared/columns-context.ts";
import columnsReducer from "../../shared/columns-reducer.ts";
import { DEFAULT_COLUMNS, LOCAL_STORAGE_KEY, TEXT_PLACEHOLDER } from "../../shared/constants.ts";
import { ColumnActionsType } from "../../shared/column-actions.ts";
import { IColumn } from "../../models/IColumn.ts";

export function Board() {
  // @ts-ignore
  const initialValue: IColumn[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || DEFAULT_COLUMNS
  
  const [columns, dispatch] = useReducer(columnsReducer, initialValue);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns))
  }, [columns])

  const addColumns = () => {
    dispatch({
      type: ColumnActionsType.ADD_COLUMN,
      payload: {
        id: uuidv4(),
        title: "",
        placeholder: TEXT_PLACEHOLDER,
      },
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;

    dispatch({
      type: ColumnActionsType.DRAG_OVER,
      payload: {
        active,
        over,
        delta,
      },
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    dispatch({
      type: ColumnActionsType.DRAG_END,
      payload: {
        active,
        over,
      },
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
        <ColumnsDispatchContext.Provider value={dispatch}>
          <div className={"container"}>
            <div className={"columns-container"}>
              {columns.map((column, index) => (
                <Column key={column.id} column={column} index={index}></Column>
              ))}
            </div>
            <button className={"add-column-button"} onClick={addColumns}>
              Add column
            </button>
          </div>
        </ColumnsDispatchContext.Provider>
      </DndContext>
    </>
  );
}
