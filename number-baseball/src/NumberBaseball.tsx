import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
import { TryInfo } from './Types/types';
import Try from './Try';

const getNumbers = () => {
    const candidates = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    const array = [];
    for ( let i=0; i < 4; i++ ) {
        const chosen = candidates.splice(Math.floor( Math.random() * (9-i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {
    const [ answer, setAnswer ] = useState(getNumbers());
    const [ value, setValue ] = useState('');
    const [ result, setResult ] = useState('');
    const [ tries, setTries ] = useState<TryInfo[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = useCallback<(e: React.FormEvent) => void>(e => {
        e.preventDefault();
        const input = inputRef.current;
        if ( value === answer.join('') ) {
            setTries((t)=> [ ...t, { try: value, result: '홈런!' }]);
            setResult('홈런!')
            alert('게임을 다시 실행합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            if ( input ) input.focus();
        } else {
            const answerArray = value.split('').map(v=> parseInt(v));
            let strike = 0;
            let ball = 0;
            if ( tries.length >=9 ) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`);
                alert('게임을 다시 실행합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                if ( input ) input.focus();
            } else {
                console.log('답은', answer.join(''));
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        console.log('strike', answerArray[i], answer[i]);
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
                        ball += 1;
                    }
                }
                setTries(t => ([ ...t, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`, },
                ]));
                setValue('');
                if (input) input.focus();
            }
        }
    }, [value, answer]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmit}>
                <input
                    ref={inputRef}
                    maxLength={4}
                    value={value}
                    onChange={onChange}
                />
                <button>Enter</button>
            </form>
            <div>Try: {tries.length}</div>
            <ul>
                { tries.map((v, i) => (
                    <Try key={`${i+1}차 시도: ${v.try}`} tryInfo={v} />
                ))}
            </ul>
        </>
    )
}

export default NumberBaseball;