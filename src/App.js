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

    const counter = state.counter || 0;

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <p>
                <button onClick={() => onChangeField('counter',counter-1)}>--</button>
                {' '}{counter}{' '}
                <button onClick={() => onChangeField('counter',counter+1)}>++</button>
            </p>
            <Address name="homeAddress" value={state.homeAddress} onChangeField={onChangeField} />
            <Address name="workAddress" value={state.workAddress} onChangeField={onChangeField} />
            <Address name="correspondenceAddress" value={state.correspondenceAddress} onChangeField={onChangeField} />
            <p>Data</p>
            <code>
                {JSON.stringify(state,null,'  ')}
            </code>
        </div>
    );
}

