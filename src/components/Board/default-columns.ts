import { v4 as uuidv4 } from 'uuid';
import { IColumn } from '../../models/IColumn';

export const DEFAULT_COLUMNS: IColumn[] = [
    {
      id: uuidv4(), title: "Column 1", cards: [
        { id: uuidv4(), text: "1.a"},
        { id: uuidv4(), text: "1.b"}
      ]
    },
    {
      id: uuidv4(), title: "Column 2", cards: [
        { id: uuidv4(), text: "2.a"},
        { id: uuidv4(), text: "2.b"}
      ]
    },
    {
      id: uuidv4(), title: "Column 3", cards: [
        { id: uuidv4(), text: "3.a"},
        { id: uuidv4(), text: "3.c"}
      ]
    },
]