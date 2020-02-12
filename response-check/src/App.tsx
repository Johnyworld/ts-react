import * as React from 'react';
import { useState, useRef, useCallback } from 'react';

const App = () => {
    const [ state, setState ] = useState('waiting');
    const [ message, setMessage ] = useState('Click to start');
    const [ result, setResult ] = useState<number[]>([]);
    const timeout = useRef<number|null>(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    const onClickScreen = useCallback(() => {
        if ( state === 'waiting' ) {
            timeout.current = window.setTimeout(() => {
                setState('now');
                setMessage('Click now!');
                startTime.current = new Date().getTime();
            }, Math.floor(Math.random() * 1000) + 2000);
            setState('ready');
            setMessage('Click when background turns green color');

        } else if ( state === 'ready' ) {
            if ( timeout.current ) clearTimeout(timeout.current);
            setState('waiting');
            setMessage('You should click after background turns green color')

        } else if ( state === 'now' ) {
            endTime.current = new Date().getTime();
            setState('waiting');
            setMessage('Click to start');
            setResult(prevResult => {
                return [ ...prevResult, endTime.current - startTime.current ]
            });
        }
    }, [ state, message, result ]);

    const onReset = useCallback(() => {
        setResult([]);
    }, [])

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>Average : {result.reduce((a, c)=> a + c) / result.length}ms</div>
                <button onClick={onReset}>Reset</button>
            </>
    }

    return (
        <>
            <div
                id='screen'
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {renderAverage()}
        </>
    )
}

export default App;