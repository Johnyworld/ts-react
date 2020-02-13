import * as React from 'react';
import { useCallback } from 'react';
import { clickCell } from './App';

interface Props {
    dispatch: React.Dispatch<any>
    rowIndex: number;
    cellIndex: number;
    cellData: string;
    children: string;
}

const Td:React.FC<Props> = ({ rowIndex, cellIndex, cellData, dispatch }) => {

    const onClickTd = useCallback(() => {
        if (cellData) return;
        dispatch(clickCell( rowIndex, cellIndex ));
    }, [cellData])

    return (
        <td onClick={onClickTd}>
            {cellData}
        </td>
    )
}

export default Td;