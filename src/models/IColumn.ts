import { ICard } from "./ICard"

export interface IColumn {
    id: string
    title: string
    placeholder?: string
    cards: ICard[]
}
