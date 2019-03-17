import React from 'react';
import {setHierarchyValue} from "./useHierarchyReducer";
import InputField from './InputField';
import { Countries, regions, zipLabel } from './data';

const makeComponentDispatch = (component, reducer, defaultValue = {}) => (action) => {
    const { dispatch, name, value = defaultValue  } = component.props;
    const changed = reducer(value,action);
    if (changed!==value) {
        setHierarchyValue(dispatch, name, changed)
    }
};

const reducerA = (state,action) => {
    if (action.type==='SET') {
        const mod = {
            ...state,
            [action.key]: action.value
        };
        if (action.key==='country') {
            mod.province = mod.address = mod.zip = '';  // if changing country, reset these
            if (action.value==='GB') {
                mod.province = 'Yorkshire';
            }
        }
        return mod;
    }
};

export default class AddressComponent extends React.PureComponent {

    // dispatchAddress = (action) => {
    //     const { dispatch, name, value = {}  } = this.props;
    //     const changed = reducerA(value,action);
    //     setHierarchyValue(dispatch, name, changed)
    // };

    dispatchAddress = makeComponentDispatch(this,reducerA,{});

    render () {
        const { name, value = {} } = this.props;
        console.log('RENDER ADDR COMP',name);

        const field = (fieldName, label, options) => {
            return <tr>
                <th>{label}</th>
                <td>
                    <InputField
                        name={fieldName}
                        path={name}
                        value={value[fieldName]}
                        options={options}
                        dispatch={this.dispatchAddress}
                    />
                </td>
            </tr>;
        };

        const country = value.country;

        return (
            <div>
                <p><b>{name}</b></p>
                <table className="Address">
                    <tbody>
                    {field('country','Country',Countries)}
                    {field('province','State / Province',regions[country])}
                    {field('address','Address')}
                    {field('zip',zipLabel[country] || 'Zip Code')}
                    </tbody>
                </table>
            </div>
        );
    }
}
