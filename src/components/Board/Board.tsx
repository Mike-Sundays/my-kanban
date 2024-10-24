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
import { ColumnsDispatchContext } from "../../shared/columns-context.ts";
import columnsReducer from "../../shared/columns-reducer.ts";
import {
  DEFAULT_COLUMNS,
  TEXT_PLACEHOLDER,
  LOCAL_STORAGE_BOARD_KEY,
  LOCAL_STORAGE_COLUMNS_KEY,
  DEFAULT_BOARD,
  SEARCH_PLACEHOLDER,
} from "../../shared/constants.ts";
import { ColumnActionsType } from "../../shared/column-actions.ts";
import { IColumn } from "../../models/IColumn.ts";
import boardReducer from "../../shared/board-reducer.ts";
import { BoardActionsType } from "../../shared/board-actions.ts";
import { CustomInput } from "../CustomInput/CustomInput.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export function Board() {
  const BOARD_TITLE_PLACEHOLDER = "Title your board...";
  // @ts-ignore
  // prettier-ignore
  const initialColumnsValue: IColumn[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_COLUMNS_KEY)) || DEFAULT_COLUMNS;

  // @ts-ignore
  // prettier-ignore
  const initialBoardValue: IBoard = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BOARD_KEY)) || DEFAULT_BOARD;

  const [columns, columnsDispatch] = useReducer(
    columnsReducer,
    initialColumnsValue,
  );

  const [board, boardDispatch] = useReducer(boardReducer, initialBoardValue);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_COLUMNS_KEY, JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_BOARD_KEY, JSON.stringify(board));
  }, [board]);

  const addColumns = () => {
    const columnId = uuidv4();
    columnsDispatch({
      type: ColumnActionsType.ADD_COLUMN,
      payload: {
        id: columnId,
        title: "",
        placeholder: TEXT_PLACEHOLDER,
      },
    });
    boardDispatch({
      type: BoardActionsType.ADD_COLUMN,
      payload: {
        id: columnId,
      },
    });
  };

  const setTitle = (id: string, text: string) => {
    boardDispatch({
      type: BoardActionsType.SET_TITLE,
      payload: {
        id: id,
        text: text,
      },
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;

    columnsDispatch({
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

    columnsDispatch({
      type: ColumnActionsType.DRAG_END,
      payload: {
        active,
        over,
      },
    });
  };

  const filterCards = (_: string, text: string) => {
    boardDispatch({
      type: BoardActionsType.SET_SEARCH_TERM,
      payload: {
        searchTerm: text,
      },
    });

    columnsDispatch({
      type: ColumnActionsType.FILTER_CARDS,
      payload: {
        searchTerm: text,
      },
    });
  };

  return (
    <div className="px-20 py-8 bg-slate-700 w-fit">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ColumnsDispatchContext.Provider value={columnsDispatch}>
          <div className="w-fit">
            <div className="flex justify-between items-center justify-center mr-4">
              <CustomInput
                parentId={board.id}
                text={board.title}
                placeholder={BOARD_TITLE_PLACEHOLDER}
                onChange={setTitle}
                cssClass="text-2xl text-gray-200 border-none outline-none m-2.5 font-bold bg-slate-700"
              ></CustomInput>
              <div className="flex">
                <button
                  className="font-bold text-white float-right cursor-pointer mr-4"
                  onClick={addColumns}
                >
                  + Column
                </button>
                <div className="flex flex-row h-fit items-center justify-center rounded-xl bg-white">
                  <MagnifyingGlassIcon className="size-4 ml-4"></MagnifyingGlassIcon>
                  <CustomInput
                    parentId={board.id}
                    text={board.searchTerm}
                    placeholder={SEARCH_PLACEHOLDER}
                    onChange={filterCards}
                    cssClass="border-none outline-none p-1 mx-2.5 "
                  ></CustomInput>
                </div>
              </div>
            </div>
            <div className="flex p-0.5">
              {columns.map((column, index) => (
                <Column key={column.id} column={column} index={index} searchTerm={board.searchTerm}></Column>
              ))}
            </div>
          </div>
        </ColumnsDispatchContext.Provider>
      </DndContext>
    </div>
  );
}
