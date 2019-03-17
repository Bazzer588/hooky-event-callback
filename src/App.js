import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import Address from './Address';
//import Address from './AddressComponent';
import AddressList from './AddressList';
import {setHierarchyValue} from "./useHierarchyReducer";

const initialState = {
    homeAddress: { country: 'US', province: 'WY' },
    previousAddresses: [{ addressKey: 'X', country: 'CA', province: 'BC' }]
};

if (!window.lastState)
    window.lastState = initialState;

function reducerApp (state,action) {
    console.log('APP REDUCER',action.type,action.key);
    let mod;
    switch(action.type) {
        case 'SET': {
            mod = {
                ...state,
                [action.key]: action.value
            };
            break;
        }
        case 'CLEAR': {
            mod = {};
            break;
        }
        default:
            mod = state;
    }
    window.lastState = mod;
    return mod;
}

function App () {

    // console.log('RENDER APP',new Error());

    const [state, dispatchApp] = useReducer(reducerApp,window.lastState);

    console.log('RENDER APP'); // ,JSON.stringify(state));

    function renderAddress (name) {
        return <Address key={name} name={name} value={state[name]} dispatch={dispatchApp} />;
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

            <AddressList
                name="previousAddresses"
                value={state.previousAddresses}
                Compo={Address}
                dispatch={dispatchApp}
            />

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
                <p>
                    <button onClick={() => dispatchApp({ type: 'CLEAR' })} type="button">Clear All</button>
                    {' '}
                    <button onClick={() => setHierarchyValue(dispatchApp,'previousAddresses',[])} type="button">Reset List</button>
                    {' '}
                    <button onClick={() => {
                        setHierarchyValue(dispatchApp,'homeAddress',{});
                        setHierarchyValue(dispatchApp,'workAddress',{});
                        setHierarchyValue(dispatchApp,'correspondAddress',{});
                    }} type="button">Reset Others</button>
                </p>
            </form>
        </div>
    );
}

export default React.memo(App);
