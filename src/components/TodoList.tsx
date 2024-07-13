import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import TodoTable from "./TodoTable";
import { DatePicker } from "@mui/x-date-pickers";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import { ColDef } from "ag-grid-community";
import { Todo } from "../interfaces/interfaces";
import { Dayjs } from "dayjs";

const TodoList = (): ReactElement => {

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
        }
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
        const newTodo: Todo = {...todo, id: id};

        setTodos(prevTodos => {
            const updatedTodos: Todo[] = [...prevTodos, newTodo];
            saveTodos(updatedTodos);
            return updatedTodos;
        });
        console.log(newTodo.id);
        setTodo({ id: null, description: "", priority: "", date: null });
    };

    /*const deleteTodo = (id: number): void => {
        setTodos(prevTodos => {
            const updatedTodos: Todo[] = prevTodos.filter(todo => todo.id !== id);
            saveTodos(updatedTodos);
            return updatedTodos;
        })
    }*/

    const saveTodos = (tobeSavedTodos: Todo[]): void => {
        localStorage.setItem("todolist", JSON.stringify(tobeSavedTodos));
    }

    useEffect((): void => {
        const storageTodos: string | null = localStorage.getItem("todolist");
        if (storageTodos) setTodos(JSON.parse(storageTodos));
    }, []);

    return (
        <>
            <fieldset>
                <legend>Add todo:</legend>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <TextField label="Description" name="description" value={todo.description} onChange={handleChange} />
                    <TextField label="Priority" name="priority" value={todo.priority} onChange={handleChange} />
                    <DatePicker label="Pick a date" value={todo.date} onChange={handleDate} />
                    <Button endIcon={<SendIcon />} color="success" variant="outlined" onClick={addTodo}>Add</Button>
                </Stack>
            </fieldset>

            <Stack justifyContent="center" alignItems="center">
                {todos.length === 0 ? <p>No todos</p> : (
                    <TodoTable data={todos} columns={columnDefs} />
                )}
            </Stack>
        </>
    );

}

export default TodoList;