import {useState} from "react";
import {ICard, IColumn} from "../interfaces.ts";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {Card} from "./Card.tsx";
import {closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";

export function Board() {
    const [columns, setColumns] = useState<IColumn[]>([
        {id: 1, title: "Column 1", cards: [{id: 1, text: "Card 1"}, {id: 2, text: "Card 2"}]},
        // {id: 2, title: "Column 2", cards: [{id: 1, text: "Card 1"}]},
        // {id: 3, title: "Column 3", cards: [{id: 1, text: "Card 1"}, {id: 2, text: "Card 2"}]},
    ])


    const addColumns = () => {
        const id = columns.length + 1
        setColumns([...columns, {
            id: id,
            title: `Column ${id}`,
            cards: [
                {id: 1, text: "Card 1"}
            ]
        }])
    }

    const setTitle = (title: string, index: number) => {
        const newColumns = [...columns]
        newColumns[index].title = title
        setColumns(newColumns)
    }


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event) {
        console.log(event)
        const {active, over} = event;

        if (active.id !== over.id) {
            setColumns((columns) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <div className={"container"}>
                    <div className={"columns-container"}>
                        {
                            columns.map((column: IColumn, index) => (
                                <div className={`column`}
                                     key={index}
                                >
                                    <input
                                        type="text"
                                        value={column.title}
                                        onChange={
                                            event => setTitle(event.target.value, index)
                                        }
                                    />
                                    <SortableContext items={column.cards} strategy={verticalListSortingStrategy}>
                                        {
                                            column.cards.map((card: ICard) => (
                                                <Card
                                                    id={card.id}
                                                    title={card.text}
                                                >
                                                </Card>
                                            ))

                                        }
                                    </SortableContext>

                                </div>
                            ))
                        }
                    </div>
                    <button className={"add-column-button"} onClick={addColumns}>Add column</button>
                </div>
            </DndContext>

        </>
    )
}
