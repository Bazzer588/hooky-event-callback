import React, {useCallback, useLayoutEffect} from "react";

const SET = 'SET';

export const standardReducer = (state,action) => {
    if (action.type === SET) {

        // has the value changed ?
        if (state[action.key] === action.value) {
            return state;  // no change
        }
        if (Array.isArray(state)) {
            const mod = [...state];
            mod[action.key] = action.value;
            return mod;
        } else {
            return { ...state, [action.key]: action.value };
        }
    }
    return state;
};

export function useHierarchyReducer (reducer,state,name,dispatch) {

    const ref = React.useRef(null);

    const doAction = (action) => {
        const mod = reducer(state,action);
        if (mod !== state) {
            setHierarchyValue(dispatch,name,mod);  // notify parent in tree
        }
    };

    useLayoutEffect( () => {
        ref.current = doAction;
    }, [state,name]);

    const callback = useCallback( (...args) => {
        return ref.current(...args);
    }, [ref]);

    return [state,callback];
}

export function setHierarchyValue (dispatch,key,value) {
    dispatch({ type: SET, key, value });
}
