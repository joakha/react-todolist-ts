import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { ReactElement, useContext } from "react";
import TodoContext from "../context/todoprovider";

const TodoTable = (): ReactElement => {

    const { todos, columnDefs } = useContext(TodoContext);

    return (
        <div className="ag-theme-material" style={{ width: 800, height: 1000 }}>
            <AgGridReact
                rowData={todos}
                columnDefs={columnDefs}
            />
        </div>
    )

}

export default TodoTable;