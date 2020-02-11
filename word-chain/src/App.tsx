import * as React from 'react';
import { useState, useRef, useCallback } from 'react';

const App = () => {
    const [ word, setWord ] = useState('행온');
    const [ value, setValue ] = useState('');
    const [ result, setResult ] = useState('');

    const inputElement = useRef<HTMLInputElement>(null);

    const onSubmit = useCallback<(e: React.FormEvent) => void>(e => {
        e.preventDefault();
        const input = inputElement.current;
        console.log(word[word.length -1], value[0])
        
        if ( word[word.length - 1] === value[0] ) {
            setResult('Okay');
            setWord(value);
            setValue('');
            if ( input ) {
                input.focus();
            }
        } else {
            setResult('Nope')
            setValue('');
            if ( input ) {
                input.focus();
            }
        }
    }, [value]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(value);
        setValue(e.currentTarget.value);
    }, []);

    return (
        <main>
            <div>{word}</div>
            <form onSubmit={onSubmit}>
                <input
                    ref={inputElement} 
                    value={value}
                    onChange={onChange}
                />
            </form>
            <div>{result}</div>
        </main>
    )
}

export default App;