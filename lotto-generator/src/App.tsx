import * as React from 'react';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Ball from './ball';

const getWinNumbers = () => {
    const candidate = Array(45).fill(null).map((v, i)=> i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push( candidate.splice( Math.floor( Math.random() * candidate.length ), 1 )[0] );
    }
    const bonusNumber = shuffle[shuffle.length -1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c );
    return [ ...winNumbers, bonusNumber ];
}

const App = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState<number[]>([]);
    const [bonus, setBonus] = useState<number | null>(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef<number[]>([]);

    useEffect(() => {
        for ( let i=0; i < winNumbers.length-1; i++ ) {
            timeouts.current[i] = window.setTimeout(() => {
                setWinBalls(prev => [ ...prev, winNumbers[i] ]);
            }, (i+1) * 1000)
        }

        timeouts.current[6] = window.setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);

        return () => {
            timeouts.current.forEach(v => {
                clearTimeout(v);
            })
        }
    }, [timeouts.current]);

    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    return (
        <>
            <div>Win numbers</div> 
            <div id="result">
                { winBalls.map( ball => <Ball key={ball} number={ball} /> ) }
            </div>
            <div>Bonus number</div>
            { bonus && <Ball number={bonus} /> }
            { redo && <button onClick={onClickRedo}>One more time</button> }
        
        </>
    )
}

export default App;