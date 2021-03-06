import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import App from './app'; // eslint-disable-line import/no-unresolved
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: http://bit.ly/CRA-PWA
 */
serviceWorker.unregister();