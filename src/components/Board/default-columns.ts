import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_COLUMNS = [
    {
      id: uuidv4(), title: "Column 1", cards: [
        { id: uuidv4(), text: "Card 1"},
        { id: uuidv4(), text: "Card 2"}
      ]
    },
    {
      id: uuidv4(), title: "Column 2", cards: [
        { id: uuidv4(), text: "Card 1"},
        { id: uuidv4(), text: "Card 2"}
      ]
    },
    {
      id: uuidv4(), title: "Column 3", cards: [
        { id: uuidv4(), text: "Card 1"},
        { id: uuidv4(), text: "Card 2"}
      ]
    },
]