import { useLayoutEffect, useMemo, useRef } from "react";

export default function useEventCallback (fn) {
    const ref = useRef();
    useLayoutEffect(() => {
        ref.current = fn;
    });
    return useMemo(() => {
        //return (...args) => (0, ref.current)(...args);
        return (...args) => ref.current(...args);
    }, []);
}


/*
    https://github.com/facebook/react/issues/14099
    ==============================================

    useLayoutEffect ... fires synchronously after all DOM mutations

    useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs)

    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

    // the magic
    return useMemo(() => (...args) => (0, ref.current)(...args), []);
*/

/*

export default function useEventCallback (fn, dependencies = []) {
    const ref = useRef(() => {
        throw new Error('Cannot call an event handler while rendering.');
    });

    useLayoutEffect(() => {
        ref.current = fn;
    });
    // }, [fn, ...dependencies]);

    return useCallback(() => {
        const fn = ref.current;
        return fn();
    }, [ref]);
}
*/
// above from https://reactjs.org/docs/hooks-faq.html
