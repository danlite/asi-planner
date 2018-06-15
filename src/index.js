import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import plannerApp from './reducers'


import { displayClassProgression } from './reducers'
window.displayClassProgression = displayClassProgression


const store = createStore(
    plannerApp,
    applyMiddleware(logger)
)

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();

