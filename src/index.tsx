import React from 'react';
import './index.css';
import {RootStateType} from './redux/store';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';
import {store} from './redux/redux-store';

const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store}/>
        </BrowserRouter>, document.getElementById('root'));
}

rerenderEntireTree(store.getState())
store.subscribe(()=> {
    const state = store.getState()
    rerenderEntireTree(state)
})