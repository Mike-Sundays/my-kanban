import { arrayMove } from "@dnd-kit/sortable";
import { IColumn } from "../models/IColumn";
import { ColumnActionsType } from "./column-actions";
import { IAction } from "../models/IAction";
import { ICard } from "../models/ICard";

export default function columnsReducer(
  columns: IColumn[],
  action: IAction,
): IColumn[] {
  switch (action.type) {
    case ColumnActionsType.ADD_CARD: {
      const columnIndex = action.payload.index;
      const newCard: ICard = {
        id: action.payload.id,
        text: ``,
        placeholder: action.payload.placeholder,
        visible: true,
      };
      const newColumns = columns.map((column, index) => {
        if (index === columnIndex) {
          return {
            ...column,
            cards: [...column.cards, newCard],
          };
        }
        return column;
      });
      return newColumns;
    }
    case ColumnActionsType.EDIT_CARD: {
      const newColumns = columns.map((column) => {
        return {
          ...column,
          cards: column.cards.map((card) => {
            if (card.id === action.payload.id) {
              return {
                ...card,
                text: action.payload.text,
              };
            }
            return card;
          }),
        };
      });
      return newColumns;
    }
    case ColumnActionsType.FILTER_CARDS: {
      const searchTerm = action.payload.searchTerm;
      return columns.map((column) => {
        return {
          ...column,
          cards: column.cards.map((card) => {
            if (searchTerm === '' || card.text.includes(searchTerm)) {
              return { ...card, visible: true };
            } else {
              return { ...card,visible: false };
            }
          }),
        };
      });
    }
    case ColumnActionsType.DELETE_CARD: {
      return columns.map((column) => {
        return {
          ...column,
          cards: column.cards.filter((card) => card.id !== action.payload.id),
        };
      });
    }
    case ColumnActionsType.ADD_COLUMN: {
      const newColumns = [
        ...columns,
        {
          id: action.payload.id,
          title: "",
          cards: [],
          placeholder: action.payload.placeholder,
        },
      ];
      return newColumns;
    }
    case ColumnActionsType.DELETE_COLUMN: {
      return columns.filter((column) => column.id !== action.payload.id);
    }
    case ColumnActionsType.SET_COLUMN_TITLE: {
      return columns.map((column) => {
        if (column.id === action.payload.id) {
          return {
            ...column,
            title: action.payload.text,
          };
        }
        return column;
      });
    }
    case ColumnActionsType.DRAG_OVER: {
      const activeId = String(action.payload.active.id);
      const overId = action.payload.over
        ? String(action.payload.over.id)
        : null;
      const activeColumn = findColumn(activeId, columns);
      const overColumn = findColumn(overId, columns);
      if (!activeColumn || !overColumn || activeColumn === overColumn) {
        return columns;
      }
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && action.payload.delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return columns.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ];
          return c;
        } else {
          return c;
        }
      });
    }
    case ColumnActionsType.DRAG_END: {
      const activeId = String(action.payload.active.id);
      const overId = action.payload.over
        ? String(action.payload.over.id)
        : null;
      const activeColumn = findColumn(activeId, columns);
      const overColumn = findColumn(overId, columns);
      if (!activeColumn || !overColumn || activeColumn !== overColumn) {
        return columns;
      }
      const activeIndex = activeColumn.cards.findIndex(
        (i) => i.id === activeId,
      );
      const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
      if (activeIndex !== overIndex) {
        return columns.map((column) => {
          if (column.id === activeColumn.id) {
            return {
              ...column,
              cards: arrayMove(overColumn.cards, activeIndex, overIndex),
            };
          } else {
            return column;
          }
        });
      } else {
        return columns;
      }
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const findColumn = (unique: string | null, columns: IColumn[]) => {
  if (!unique) {
    return null;
  }
  if (columns.some((c) => c.id === unique)) {
    return columns.find((c) => c.id === unique) ?? null;
  }
  const id = String(unique);
  const itemWithColumnId = columns.flatMap((c) => {
    const columnId = c.id;
    return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
  });
  const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
  return columns.find((c) => c.id === columnId) ?? null;
};
