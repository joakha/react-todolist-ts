import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { TodoTableProps } from "../interfaces/interfaces";
import { ReactElement } from "react";

const TodoTable = ({ data, columns }: TodoTableProps): ReactElement => {

    return (
        <div className="ag-theme-material" style={{ width: 600, height: 500 }}>
            <AgGridReact
                rowData={data}
                columnDefs={columns}
            />
        </div>
    )

}

export default TodoTable;