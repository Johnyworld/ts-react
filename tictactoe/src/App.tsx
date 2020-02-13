import * as React from 'react';
import { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

interface IInitState {
    winner: 'O' | 'X' | ''
    turn: 'O' | 'X'
    tableData: string[][]
    recentCell: [number, number]
}

const initState:IInitState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell: [-1, -1]
}

export const SET_WINNER = 'SET_WINNER' as const;
export const CLICK_CELL = 'CLICK_CELL' as const;
export const CHANGE_TURN = 'CHANGE_TURN' as const;
export const RESET_GAME = 'RESET_GAME' as const;

interface ActionSetWinner {
    type: typeof SET_WINNER;
    winner: 'O' | 'X' | ''; 
}

const setWinner = (winner: 'O' | 'X' | ''): ActionSetWinner => {
    return { type: SET_WINNER, winner };
}

interface ActionClickCell {
    type: typeof CLICK_CELL;
    row: number;
    cell: number;
}

export const clickCell = (row: number, cell: number): ActionClickCell => {
    return { type: CLICK_CELL, row, cell }
}

interface ActionChangeTurn {
    type: typeof CHANGE_TURN;
}

interface ActionResetGame {
    type: typeof RESET_GAME;
}

type ReducerActions = ActionSetWinner | ActionClickCell | ActionChangeTurn | ActionResetGame;

const reducer = (state: IInitState, action:ReducerActions ): IInitState => {
    // 이전 State 를 action 을 통해서 새로운 State 로 바꿔주는 역할을 함.
    switch (action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner
            } 
        case CLICK_CELL:
            const tableData = [ ...state.tableData ]
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [ action.row, action.cell ]
            }
        case CHANGE_TURN: 
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        case RESET_GAME:
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ],
                recentCell: [-1, -1]
            }
        default:
            return state;
    }
}

const App = () => {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const { tableData, turn, winner, recentCell } = state;

    useEffect(() => {
        const [ row, cell ] = recentCell;
        if ( row < 0 ) return;
        let win = false;
        if ( tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn ) win = true;
        if ( tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn ) win = true;
        if ( tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn ) win = true;
        if ( tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn ) win = true;

        if ( win ) {
            // dispatch({ type: SET_WINNER, winner: turn })
            dispatch(setWinner(turn));
            dispatch({ type: RESET_GAME });
        } else {
            let draw = true;
            tableData.forEach( row => {
                row.forEach( cell => {
                    if ( !cell ) draw = false;
                })
            })

            if ( draw ) {
                dispatch({ type: RESET_GAME });
                dispatch(setWinner(''));
            }
            else dispatch({ type: CHANGE_TURN });
        }

    }, [recentCell])

    const onClickTable = useCallback(() => {
        dispatch(setWinner('O'));
    }, [])

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            { winner && <div>{winner} is Win!</div> }
        </>
    )
}

export default App;