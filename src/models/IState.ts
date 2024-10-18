import { IBoard } from "./IBoard";
import { IColumn } from "./IColumn";

export interface IState {
    board: IBoard,
    columns: IColumn[]
}