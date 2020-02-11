import * as React from 'react';
import { useState, useRef } from 'react';


const App = () => {
    const [ first, setFirst ] = useState(Math.ceil(Math.random() *9));
    const [ second, setSecond ] = useState(Math.ceil(Math.random() *9));
    const [ value, setValue ] = useState('');
    const [ result, setResult ] = useState('');

    const inputEl = useRef<HTMLInputElement>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = inputEl.current;
        if (parseInt(value) === first * second) {
            setResult('Correct!');
            setFirst(Math.ceil(Math.random() *9));
            setSecond(Math.ceil(Math.random() *9));
            setValue('');
            if (input) {
                input.focus();
            }
        } else {
            setResult('Nope!');
            setValue('');
            if (input) {
                input.focus();
            }
        }
         

    }

    return (
        <main>
            <div>{first} x {second} ?</div>
            <form onSubmit={onSubmit}>
                <input
                    ref={inputEl}
                    type='number'
                    value={value}
                    onChange={e=> setValue(e.target.value)}
                />
            </form>
        </main>
    )
}

export default App;