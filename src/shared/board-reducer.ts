import { IBoard } from "../models/IBoard";
import { IAction } from "../models/IAction";
import { BoardActionsType } from "./board-actions";

export default function columnsReducer(board: IBoard, action: IAction): IBoard {
  switch (action.type) {
    case BoardActionsType.SET_TITLE: {
      return { ...board, title: action.payload.text };
    }
    case BoardActionsType.ADD_COLUMN: {
      return { ...board, columnIds: [...board.columnIds, action.payload.id]};
    }
    case BoardActionsType.SET_SEARCH_TERM: {
      return { ...board, searchTerm: action.payload.searchTerm};
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
