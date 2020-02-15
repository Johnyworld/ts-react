import * as React from 'react';
import { useContext, useCallback, memo } from 'react';
import { TableContext, CODE, Codes } from './App';
import { openCell, clickMine, flagMine, questionCell, normalizeCell } from './Action';

const getTdStyle = (code: Codes) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            };
        default:
            return {
                background: 'white',
            };
    }
};

const getTdText = (code: Codes) => {
    console.log('getTdtext');
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
};

interface Props {
    rowIndex: number;
    cellIndex: number;
}

const Td:React.FC<Props> = ({ rowIndex, cellIndex }) => {
    const { tableData, halted, dispatch } = useContext(TableContext);
    
    const onClick = useCallback(() => {
        if (halted) return;
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch(openCell(rowIndex, cellIndex));
                return;
            case CODE.MINE:
                dispatch(clickMine(rowIndex, cellIndex));
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (halted) return;
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch(flagMine(rowIndex, cellIndex));
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch(questionCell(rowIndex, cellIndex));
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch(normalizeCell(rowIndex, cellIndex));
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    return (
        <RealTd onClick={onClick} onRightClick={onRightClick} data={tableData[rowIndex][cellIndex]} />
    )
}

interface RealTdProps {
    onClick: () => void;
    onRightClick: (e: React.MouseEvent) => void;
    data: Codes;
}

const RealTd:React.FC<RealTdProps> = memo(({ onClick, onRightClick, data }) => {
    return (
        <td
            style={getTdStyle(data)}
            onClick={onClick}
            onContextMenu={onRightClick}
        >{getTdText(data)}</td>
    )
});

export default memo(Td)