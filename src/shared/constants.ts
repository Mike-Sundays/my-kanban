import { v4 as uuidv4 } from "uuid";
import { IColumn } from "./models/IColumn";
import { IBoard } from "../models/IBoard";

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

export const TEXT_PLACEHOLDER = "Write something...";
export const LOCAL_STORAGE_KEY = "Columns"
