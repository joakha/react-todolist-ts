import { ReactElement, useContext, useEffect } from "react";
import TodoTable from "./TodoTable";
import { DatePicker } from "@mui/x-date-pickers";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import TodoContext from "../context/todoprovider";

const TodoList = (): ReactElement => {

    const {todo, todos, setTodos, handleChange, handleDate, addTodo} = useContext(TodoContext);

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
                    <TodoTable />
                )}
            </Stack>
        </>
    );

}

export default TodoList;