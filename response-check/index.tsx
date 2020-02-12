import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './src/App';

const Hot = hot(App);

ReactDOM.render(<Hot />, document.getElementById('root'));
