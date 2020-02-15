import * as React from 'react';
import { useState, useCallback } from 'react';

const useInput = (defaultData: number) => {
    const [ value, setValue ] = useState(defaultData);

    const onChange = useCallback(( e: React.ChangeEvent<HTMLInputElement> ) => {
        setValue(Number(e.target.value));
    }, [value]);

    return { value, onChange }
}

export default useInput;