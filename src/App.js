import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import Address from './Address';
import AddressList from './AddressList';

const initialState = {
    homeAddress: { country: 'US' },
    previousAddresses: [{ addressKey: 'X', country: 'CA' }]
};

function reducerApp (state,action) {
    switch(action.type) {
        case 'SET': {
            return {
                ...state,
                [action.key]: action.value
            };
        }
        default:
            return state;
    }
}

export default function App () {

    const [state, dispatchApp] = useReducer(reducerApp,initialState);

    function renderAddress (name) {
        return <Address name={name} value={state[name]} dispatch={dispatchApp} />;
    }

    const counter = state.counter || 0;

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <form autoComplete="off">

            <p>
                <button onClick={() => dispatchApp({ type: 'SET', key: 'counter', value: counter-1 })} type="button">--</button>
                {' '}{counter}{' '}
                <button onClick={() => dispatchApp({ type: 'SET', key: 'counter', value: counter+1 })} type="button">++</button>
            </p>

            {renderAddress('homeAddress')}
            {renderAddress('workAddress')}
            {renderAddress('correspondAddress')}

            <AddressList name="previousAddresses" value={state.previousAddresses} dispatch={dispatchApp}/>

            <p><b>Data</b></p>
            <code>
                {JSON.stringify(state,null,'  ')}
            </code>

            <p>
                <a href="https://github.com/Bazzer588/hooky-event-callback" target="_blank" rel="noopener noreferrer">
                https://github.com/Bazzer588/hooky-event-callback
                </a>
            </p>

                <p>See github for full details</p>
            </form>
        </div>
    );
}
