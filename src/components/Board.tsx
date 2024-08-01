import {useState} from "react";
import {Card, Column} from "../interfaces.ts";

export function Board() {
    const [columns, setColumns] = useState<Column[]>([
        {title: "Column 1", cards: [{text: "Card 1"}, {text: "Card 2"}]},
        {title: "Column 2", cards: [{text: "Card 1"}]},
        {title: "Column 3", cards: [{text: "Card 1"},{text: "Card 2"},{text: "Card 3"}]},
    ])

    return (
        <>
            <div className={"container"}>
                {
                    columns.map((column: Column, index) => (
                        <div className={`column`}
                             key={index}
                             style={{backgroundColor: "grey"}}
                        >
                            {column.title}
                            {
                                column.cards.map((card: Card, index) => (
                                    <div className={`card`}
                                         key={index}
                                         style={{backgroundColor: "lightgrey"}}
                                    >
                                        {card.text}
                                    </div>
                                ))

                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}
