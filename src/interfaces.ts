export interface ICard {
    id: number
    text: string
}

export interface IColumn {
    id: number,
    title: string
    cards: ICard[]
}
