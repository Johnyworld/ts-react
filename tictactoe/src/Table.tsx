import * as React from 'react';
import { useMemo } from 'react';
import Tr from './Tr';

interface Props {
    tableData: string[][];
    dispatch: React.Dispatch<any>;
    onClick: () => void;
}

const Table: React.FC<Props> = ({ tableData, dispatch, onClick }) => {
    return (
        <table>
            {Array(tableData.length).fill(null).map(( tr, i ) => (
                useMemo(() => <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />, [tableData[i]])
            ))}
        </table>
    )
}

export default Table;
