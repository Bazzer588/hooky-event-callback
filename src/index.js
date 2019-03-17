import 'react-app-polyfill/ie11'; // has to be first
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

const render = Root => {
    ReactDOM.render(<Root/>, document.getElementById('root'));
};

window.setTimeout( () => render(App), 100 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

if (process.env.NODE_ENV==='development') {
    if (module.hot) {
        module.hot.accept('./App', () => {
            //console.log('MOD HOT');
            const NextApp = require('./App').default;
            render(NextApp);
        });
    }
}
