export interface ICard {
    id: string
    text: string
    placeholder: string
}

export interface IColumn {
    id: string
    title: string
    cards: ICard[]
    placeholder: string
}
