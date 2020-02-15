import * as React from 'react';
import { useContext } from 'react';
import { TableContext } from './App';
import Td from './Td';

interface Props {
    rowIndex: number;
}

const Tr:React.FC<Props> = ({ rowIndex }) => {
    const { tableData } = useContext(TableContext);
    return (
        <tr>
            { tableData[0] && tableData[rowIndex].map((td, i) => (
                <Td rowIndex={rowIndex} cellIndex={i} />
            ))}
        </tr>
    )
}

export default Tr;