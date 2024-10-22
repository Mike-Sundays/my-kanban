import { v4 as uuidv4 } from "uuid";
import { IColumn } from "../models/IColumn";
import { IBoard } from "../models/IBoard";

export const ENTER = "Enter";
export const ESCAPE = "Escape";
export const DEFAULT_COLUMNS: IColumn[] = [
  {
    id: uuidv4(),
    title: "Column 1",
    cards: [
      { id: uuidv4(), text: "1.a" },
      { id: uuidv4(), text: "1.b" },
    ],
  },
  {
    id: uuidv4(),
    title: "Column 2",
    cards: [
      { id: uuidv4(), text: "2.a" },
      { id: uuidv4(), text: "2.b" },
    ],
  },
  {
    id: uuidv4(),
    title: "Column 3",
    cards: [
      { id: uuidv4(), text: "3.a" },
      { id: uuidv4(), text: "3.c" },
    ],
  },
];

export const DEFAULT_BOARD: IBoard = {
  id: uuidv4(),
  title: 'Title',
  columnIds: [DEFAULT_COLUMNS[0].id, DEFAULT_COLUMNS[1].id, DEFAULT_COLUMNS[2].id]
}

export const TEXT_PLACEHOLDER = "Write something...";
export const LOCAL_STORAGE_COLUMNS_KEY = "Columns"
export const LOCAL_STORAGE_BOARD_KEY = "Board"
