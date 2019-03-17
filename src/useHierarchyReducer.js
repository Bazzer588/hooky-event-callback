import React, {useCallback, useLayoutEffect} from "react";

const SET = 'SET';

export const standardReducer = (state,action) => {
    if (action.type===SET) {
        // call reducer? did it deal with SET itself?
        // const changed = reducer(state,action);
        // if (changed!==state) {
        //     return changed;
        // }
        // has the value changed ?
        if (state[action.key]===action.value) {
            return state;  // no change
        }
        if (Array.isArray(state)) {
            const mod = [...state];
            mod[action.key] = action.value;
            return mod;
        } else {
            const mod = { ...state, [action.key]: action.value };
            // TODO call reducer to let it mutate mod ?
            return mod;
        }
    }
    // any action other than SET
    return state;
    // return reducer ? reducer(state,action) : state;
};

export function useHierarchyReducer (reducer,state,name,dispatch) {

    const ref = React.useRef(null);

    const redo = (action) => {
        // const value = enhancedReducer(reducer,state)(action);  // TODO some way of passing messages up the tree ?
        const value = reducer(state,action);
        if (value!==state) {
            setHierarchyValue(dispatch,name,value);  // notify parent in tree
        }
    };

    useLayoutEffect(() => {
        ref.current = redo;
    }, [state,name]);

    const safe = useCallback((...args) => {
        return ref.current(...args);
    }, [ref]);

    return [state,safe];
}

export function setHierarchyValue(dispatch,key,value) {
    dispatch({ type: SET, key, value });
}
