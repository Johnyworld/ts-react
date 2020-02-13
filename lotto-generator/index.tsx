import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './src/App';
import { hot } from 'react-hot-loader/root';

const Hot = hot(App);

ReactDOM.render(<Hot />, document.getElementById('root'));