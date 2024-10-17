import { createContext} from 'react'

// @ts-ignore
export const ColumnsDispatchContext = createContext<Dispatch<ColumnAction> | null>(null)