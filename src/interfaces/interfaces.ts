import { Dayjs } from "dayjs";
import { ReactElement } from "react";

export interface Todo {
    id: number | null,
    description: string,
    priority: string,
    date: Dayjs | null
}

export interface ChildrenType {
    children?: ReactElement | ReactElement[]
}