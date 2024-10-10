import { arrayMove } from "@dnd-kit/sortable";
import { IColumn } from "../../models/IColumn";
import { ColumnActionsType } from "./column-actions";

interface ColumnAction {
    type: string,
    payload: any
}

export default function columnsReducer(columns: IColumn[], action: ColumnAction): IColumn[] {
    if (action.type === ColumnActionsType.ADD_CARD) {
        const columnIndex = action.payload.index
        const newCard = { id: action.payload.id, text: ``, placeholder: action.payload.placeholder }
        const newColumns = columns.map((column, index) => {
            if (index === columnIndex) {
                return {
                    ...column,
                    cards: [...column.cards, newCard]
                };
            }
            return column
        })
        return newColumns
    } else if (action.type === ColumnActionsType.EDIT_CARD) {
        const newColumns = columns.map(column => {
            return {
                ...column,
                cards: column.cards.map(card => {
                    if (card.id === action.payload.id) {
                        return {
                            ...card,
                            text: action.payload.text
                        }
                    }
                    return card
                })
            };
        });
        return newColumns
    } else if (action.type === ColumnActionsType.ADD_COLUMN) {
        const newColumns = [...columns, {
            id: action.payload.id,
            title: ``,
            cards: [],
            placeholder: action.payload.placeholder
        }]
        return newColumns
    } else if (action.type === ColumnActionsType.SET_COLUMN_TITLE) {
        return columns.map(column => {
            if (column.id === action.payload.id) {
                return {
                    ...column,
                    title: action.payload.text
                };
            }
            return column
        })
    } else if (action.type === ColumnActionsType.DRAG_OVER) {
        const activeId = String(action.payload.active.id);
        const overId = action.payload.over ? String(action.payload.over.id) : null;
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
                    ...overItems.slice(newIndex(), overItems.length)
                ];
                return c;
            } else {
                return c;
            }
        });

    } else if (action.type === ColumnActionsType.DRAG_END) {
        const activeId = String(action.payload.active.id);
        const overId = action.payload.over ? String(action.payload.over.id) : null;
        const activeColumn = findColumn(activeId, columns);
        const overColumn = findColumn(overId, columns);
        if (!activeColumn || !overColumn || activeColumn !== overColumn) {
            return columns;
        }
        const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
        const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
        if (activeIndex !== overIndex) {
            return columns.map((column) => {
                if (column.id === activeColumn.id) {
                   return {
                        ...column,
                        cards: arrayMove(overColumn.cards, activeIndex, overIndex)
                    }
                } else {
                    return column;
                }
            });
        } else {
            return columns
        }
    }
    else {
        throw Error('Unknown action: ' + action.type);
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