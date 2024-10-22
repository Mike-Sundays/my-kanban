import { createContext, Dispatch } from "react";
import { IAction } from "../models/IAction";

// @ts-ignore
export const ColumnsDispatchContext = createContext<Dispatch<IAction>>();
