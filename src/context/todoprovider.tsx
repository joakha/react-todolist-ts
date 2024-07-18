import { ChangeEvent, useState, createContext, ReactElement } from "react";
import { Todo, ChildrenType } from "../interfaces/interfaces";
import { ColDef } from "ag-grid-community";
import { CustomCellRendererProps } from "ag-grid-react";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { Dayjs } from "dayjs";

const useTodoContext = () => {

    const [todo, setTodo] = useState<Todo>({ id: null, description: "", priority: "", date: null });
    const [todos, setTodos] = useState<Todo[]>([]);

    const columnDefs: ColDef[] = [
        { field: 'description', filter: true, floatingFilter: true },
        {
            field: 'priority',
            cellStyle: (params) => params.value === "High" ? { color: 'red' } : { color: 'black' },
            filter: true, floatingFilter: true
        },
        {
            field: 'date', filter: true, floatingFilter: true,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString("fi-FI")
        },
        { cellRenderer: (params: CustomCellRendererProps) => <Button startIcon={<DeleteIcon />} color="error" variant="outlined" onClick={() => deleteTodo(params.data.id)}>Delete</Button> }
    ];

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTodo({ ...todo, [event.target.name]: event.target.value });
    }

    const handleDate = (value: Dayjs | null): void => {
        setTodo({ ...todo, date: value });
    }

    const addTodo = (): void => {
        if (todo.date === null || todo.priority === "" || todo.description === "") {
            alert("Fill all fields!");
            return;
        }

        const id: number = todos.length ? todos[todos.length - 1].id as number + 1 : 0;
        const newTodo: Todo = { ...todo, id: id };

        setTodos(prevTodos => {
            const updatedTodos: Todo[] = [...prevTodos, newTodo];
            saveTodos(updatedTodos);
            return updatedTodos;
        });
        setTodo({ id: null, description: "", priority: "", date: null });
    };

    const deleteTodo = (id: number): void => {
        if (confirm("Are you sure?")) {
            setTodos(prevTodos => {
                const updatedTodos: Todo[] = prevTodos.filter(todo => todo.id !== id);
                saveTodos(updatedTodos);
                return updatedTodos;
            })
        }
    }

    const saveTodos = (tobeSavedTodos: Todo[]): void => {
        localStorage.setItem("todolist", JSON.stringify(tobeSavedTodos));
    }

    return { todo, todos, setTodos, columnDefs, handleChange, handleDate, addTodo }

}

type UseTodoContextType = ReturnType<typeof useTodoContext>

const initTodoContextState: UseTodoContextType = {

    todo: { id: null, description: "", priority: "", date: null },
    todos: [],
    setTodos: () => { },
    columnDefs: [],
    handleChange: () => { },
    handleDate: () => { },
    addTodo: () => { }

}

const TodoContext = createContext<UseTodoContextType>(initTodoContextState);

export const TodoProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <TodoContext.Provider value={useTodoContext()}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext