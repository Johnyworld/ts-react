import * as React from 'react';
import { useMemo, useEffect, useRef } from 'react';
import Td from './Td';

interface Props {
    dispatch: React.Dispatch<any>;
    rowIndex: number;
    rowData: string[];
}

const Tr: React.FC<Props> = ({ rowIndex, rowData, dispatch }) => {
    return (
        <tr>
            { Array(rowData.length).fill(null).map((td, i) => (
                useMemo(() => (
                    <Td
                        key={i}
                        dispatch={dispatch}
                        rowIndex={rowIndex}
                        cellIndex={i}
                        cellData={rowData[i]} >
                        {''}
                    </Td>
                ), [rowData[i]])
            )) }
        </tr>
    )
}

export default Tr;