import { v4 as uuidv4 } from "uuid";
import { IColumn } from "../models/IColumn";
import { IBoard } from "../models/IBoard";

export const ENTER = "Enter";
export const ESCAPE = "Escape";
export const DEFAULT_COLUMNS: IColumn[] = [
  {
    id: uuidv4(),
    title: "To Do",
    cards: [
      { id: uuidv4(), text: "1.a", visible: true },
      { id: uuidv4(), text: "1.b", visible: true },
    ],
  },
  {
    id: uuidv4(),
    title: "Doing",
    cards: [
      { id: uuidv4(), text: "2.a", visible: true },
      { id: uuidv4(), text: "2.b", visible: true },
    ],
  },
  {
    id: uuidv4(),
    title: "Done",
    cards: [
      { id: uuidv4(), text: "3.a", visible: true },
      { id: uuidv4(), text: "3.c", visible: true },
    ],
  },
];

export const DEFAULT_BOARD: IBoard = {
  id: uuidv4(),
  title: 'My Board',
  columnIds: [DEFAULT_COLUMNS[0].id, DEFAULT_COLUMNS[1].id, DEFAULT_COLUMNS[2].id],
  searchTerm: ''
}

export const TEXT_PLACEHOLDER = "Write something...";
export const SEARCH_PLACEHOLDER = "Search...";
export const LOCAL_STORAGE_COLUMNS_KEY = "Columns"
export const LOCAL_STORAGE_BOARD_KEY = "Board"
