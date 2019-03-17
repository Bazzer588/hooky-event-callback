import React from 'react';
import Address from './Address';
import {useHierarchyReducer} from "./data/useHierarchyReducer";

const reducerAddressList = (state,action) => {
    const mod = [...state];
    switch (action.type) {
        case 'SET': {
            mod[action.key] = action.value;
            break;
        }
        case 'DELETE': {
            mod.splice(action.key,1);
            console.log('DELETE',action.key,dbg(state));
            break;
        }
        case 'INSERT': {
            mod.splice(action.key,0,action.value);
            console.log('INSERT',dbg(mod));
            break;
        }
        case 'REVERSE': {
            mod.reverse();
            console.log('REVERSED',dbg(mod));
            break;
        }
        default:
            throw new Error('Invalid action');
    }
    //dispatch({ type: 'SET', key: name, value: mod });
    return mod;
};

function AddressList ({ name, value = [], dispatch }) {

    console.log('RENDER LIST',name, dbg(value) );

    const reducer = React.useCallback(reducerAddressList,[value]);
    const [state, dispatchList] = useHierarchyReducer(reducer, value,name,dispatch);

    // const initial = React.useRef(true);
    //
    // React.useLayoutEffect( () => {
    //     if (initial.current) initial.current = false;
    //     else dispatch({ type: 'SET', key: name, value: state })
    // },[state]);

    const output = state.map( (address,index) => {
        return (
            <div key={address.addressKey} style={{ position: 'relative' }}>
                <button onClick={() => dispatchList({ type: 'DELETE', key: index })} className="top-right" type="button">Delete</button>
                <Address name={index} value={address} dispatch={dispatchList} />
            </div>
        );
    });

    return (
        <div>
            <p><b>{name}</b></p>
            {output}
            <p>
                <button onClick={() => dispatchList({ type: 'SET', key: state.length, value: { addressKey: 'K'+(keySequence++) } })} type="button">
                    Add another address
                </button>
                {' '}
                {state.length > 1 &&
                    <button onClick={() => dispatchList({type: 'REVERSE'})} type="button">
                        Reverse list
                    </button>
                }
                {' '}
                    {state.length>0 &&
                    <button onClick={() => dispatchList({type: 'INSERT', key: 0, value: { addressKey: 'K'+(keySequence++) } })} type="button">
                        Insert
                    </button>
                }
            </p>
        </div>
    );

}

// function sameList (prev, next) {
//     return prev.value===next.value;
// }

export default React.memo(AddressList);

let keySequence = 1;

function dbg (lst) {
    return '['+lst.map( a => a.addressKey ).join(',')+']';
}