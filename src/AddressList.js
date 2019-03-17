import React from 'react';
import {useHierarchyReducer, standardReducer} from "./useHierarchyReducer";

const reducerAddressList = (state,action) => {
    const mod = [...state];
    switch (action.type) {
        // case 'SET': {
        //     mod[action.key] = action.value;
        //     break;
        // }
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
        case 'UP': {
            const i = action.key;
            if (i<1) return state;
            const r = mod[i];
            mod[i] = mod[i-1];
            mod[i-1] = r;
            break;
        }
        case 'DOWN': {
            const i = action.key;
            if (i>=state.length-1) return state;
            const r = mod[i];
            mod[i] = mod[i+1];
            mod[i+1] = r;
            break;
        }
        case 'REVERSE': {
            mod.reverse();
            console.log('REVERSED',dbg(mod));
            break;
        }
        default:
            return standardReducer(state,action);
            // throw new Error('Invalid action');
    }
    //dispatch({ type: 'SET', key: name, value: mod });
    return mod;
};

function AddressList ({ name, value = [], dispatch, Compo }) {

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
                <span className="top-right">
                    <button onClick={() => dispatchList({ type: 'UP', key: index })} type="button">Up</button>
                    {' '}
                    <button onClick={() => dispatchList({ type: 'DOWN', key: index })} type="button">Down</button>
                    {' '}
                    <button onClick={() => dispatchList({ type: 'DELETE', key: index })} type="button">Delete</button>
                </span>
                <Compo name={index} value={address} dispatch={dispatchList} />
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