import { ColDef } from "ag-grid-community";
import { Dayjs } from "dayjs";

export interface Todo {
    id: number | null,
    description: string,
    priority: string,
    date: Dayjs | null
}

export interface TodoTableProps {
    data: Todo[],
    columns: ColDef[],
}