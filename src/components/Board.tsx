import {useState} from "react";
import {Card, Column} from "../interfaces.ts";

export function Board() {
    const [columns, setColumns] = useState<Column[]>([
        {title: "Column 1", cards: [{text: "Card 1"}, {text: "Card 2"}]},
        {title: "Column 2", cards: [{text: "Card 1"}]},
        {title: "Column 3", cards: [{text: "Card 1"}, {text: "Card 2"}, {text: "Card 3"}]},
    ])

    const addColumns = () => {
        setColumns([...columns, {title: `Column ${columns.length + 1}`, cards: [{text: "Card 1"}]},])
    }

    const setTitle = (title: string, index: number) => {
        const newColumns = [...columns]
        newColumns[index].title = title
        setColumns(newColumns)
    }

    return (
        <>
            <div className={"container"}>
                <div className={"columns-container"}>
                    {
                        columns.map((column: Column, index) => (
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

                                {
                                    column.cards.map((card: Card, index) => (
                                        <div className={`card`}
                                             key={index}
                                        >
                                            {card.text}
                                        </div>
                                    ))

                                }
                            </div>
                        ))
                    }
                </div>
                <button className={"add-column-button"} onClick={addColumns}>Add column</button>
            </div>


        </>
    )
}
