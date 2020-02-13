import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

const rspCoords = {
    rock: '0',
    scissors: '-142px',
    paper: '-284px'
} as const;

const scores = {
    rock: 0,
    scissors: 1,
    paper: -1
} as const;

type ImgCoords = typeof rspCoords[keyof typeof rspCoords];
type ImgCoordsKeys = keyof typeof rspCoords;

const computerChoice = (imgCoords: ImgCoords) => {
    return (Object.keys(rspCoords) as [ 'rock', 'scissors', 'paper' ]).find(k=> {
        return rspCoords[k] === imgCoords;
    })!;
}

const App = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState<ImgCoords>(rspCoords.rock);
    const [score, setScore] = useState(0);
    const interval = useRef<number>();

    useEffect(() => {
        interval.current = window.setInterval(changeHand, 100);
        return () => { clearInterval(interval.current) }
    }, [ imgCoord ])

    const changeHand = () => {
        if ( imgCoord === rspCoords.rock ) {
            setImgCoord( rspCoords.scissors );

        } else if ( imgCoord === rspCoords.scissors ) {
            setImgCoord( rspCoords.paper );

        } else if ( imgCoord === rspCoords.paper ) {
            setImgCoord( rspCoords.rock );
        }
    }

    const onClick = (choice: ImgCoordsKeys) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const comScore = scores[computerChoice(imgCoord)];
        const diff = myScore - comScore;
        if ( diff === 0 ) {
            setResult('Even!');

        } else if ( [-1, 2].includes(diff) ) {
            setResult('You Win!');
            setScore(prev => prev + 1);

        } else {
            setResult('You lose!');
            setScore(prev => prev - 1);
        }

        setTimeout(() => {
            interval.current = window.setInterval(changeHand, 100);
        }, 1000);

    }

    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClick('rock')}>Rock</button>
                <button id="scissor" className="btn" onClick={onClick('scissors')}>Scissors</button>
                <button id="paper" className="btn" onClick={onClick('paper')}>paper</button>
            </div>
            <div>{result}</div>
            <div>Now your score: [ {score} ] point.</div>
        </>
    )
}

export default App;