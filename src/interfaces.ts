export interface ICard {
    id: string
    text: string
}

export interface IColumn {
    id: string
    title: string
    cards: ICard[]
}
