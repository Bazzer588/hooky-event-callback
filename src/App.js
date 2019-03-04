import React, { useState } from 'react';
import useEventCallback from './useEventCallback';
import logo from './logo.svg';
import './App.css';
import Address from './Address';

export default function App () {

    const [state, setState] = useState({});

    const onChangeField = useEventCallback( (changed,newValue) => {
        setState({ ...state, [changed]: newValue });
    }, [state] );

    function renderAddress (name) {
        return <Address name={name} value={state[name]} onChangeField={onChangeField} />;
    }

    const counter = state.counter || 0;

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <form autoComplete="off">

            <p>
                <button onClick={() => onChangeField('counter',counter-1)} type="button">--</button>
                {' '}{counter}{' '}
                <button onClick={() => onChangeField('counter',counter+1)} type="button">++</button>
            </p>

            {renderAddress('homeAddress')}
            {renderAddress('workAddress')}
            {renderAddress('correspondAddress')}

            <p><b>Data</b></p>
            <code>
                {JSON.stringify(state,null,'  ')}
            </code>

            <p>
                <a href="https://github.com/Bazzer588/hooky-event-callback" target="_blank" rel="noopener noreferrer">
                https://github.com/Bazzer588/hooky-event-callback
                </a>
            </p>
            </form>
        </div>
    );
}

