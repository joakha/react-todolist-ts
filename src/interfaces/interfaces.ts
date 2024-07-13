import { ColDef } from "ag-grid-community";
import { Dayjs } from "dayjs";

export interface Todo {
    description: string,
    priority: string,
    date: Dayjs | null
}

export interface TodoTableProps {
    data: Todo[],
    columns: ColDef[],
}