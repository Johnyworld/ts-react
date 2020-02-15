import * as React from 'react';
import { useContext } from 'react';
import { TableContext } from './App';
import Tr from './Tr';

const Table = () => {
    const { tableData } = useContext(TableContext);
    return (
        <table>
            { tableData.map((tr, i) => ( <Tr rowIndex={i} /> ))}
        </table>
    )
}

export default Table;