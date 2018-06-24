import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import plannerApp from './reducers'

import { RESET_CHARACTER_CLASS, SET_RACE } from './actions'


// import { displayClassProgression } from './reducers'
// window.displayClassProgression = displayClassProgression

const middleware = false ? applyMiddleware(logger) : undefined

const store = createStore(
    plannerApp,
    middleware
)

const startup = false
if (startup) {
    store.dispatch({
        type: RESET_CHARACTER_CLASS,
        class: 'barbarian'
    })

    store.dispatch({
        type: SET_RACE,
        race: 'human-variant'
    })
}

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();

