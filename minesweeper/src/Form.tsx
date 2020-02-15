import * as React from 'react';
import { useState, useCallback, useContext } from 'react';
import { TableContext } from './App';
import useInput from './useInput';
import { startGame } from './Action';

const Form = () => {
    const row = useInput( 10 );
    const cell = useInput( 10 );
    const mine = useInput( 20 );

    const { dispatch } = useContext(TableContext);

    const onClickBtn = useCallback(() => {
        dispatch( startGame( row.value, cell.value, mine.value ) );
    }, [ row, cell, mine ])

    return (
        <div>
            <input type='number' placeholder='vertical' { ...row } />
            <input type='number' placeholder='horizontal' { ...cell } />
            <input type='number' placeholder='mine' { ...mine } />
            <button onClick={onClickBtn}>Let's Start!</button>
        </div>
    )
}

export default Form;