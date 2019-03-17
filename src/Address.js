import React from 'react';
import InputField from './InputField';
import {useHierarchyReducer} from "./useHierarchyReducer";
import { Countries, regions, zipLabel } from './data';

const reducerAddress = (state,action) => {
    if (action.type==='SET') {
        const mod = {
            ...state,
            [action.key]: action.value
        };
        if (action.key==='country') {
            mod.province = mod.address = mod.zip = '';  // if changing country, reset these
            if (action.value==='GB') {
                mod.province = 'Somerset';
            }
        }
        return mod;
    }
};

/** A reusable Address component
 *
 * @param name should be unique on the page, for example 'homeAddress', 'otherAddress', 'newAddress'
 * @param value an object or undefined to start, ie { country: '', province: '', address: '', zip: '' }
 * @param dispatch - call with { type: 'SET', key: name, value: mod }
 */

function Address ({ name, value = {}, dispatch }) {

    const dispatchAddress = useHierarchyReducer(reducerAddress,value,name,dispatch);

    console.log('RAD',value.addressKey,value.country);

    function field (fieldName, label, options) {
        return <tr>
            <th>{label}</th>
            <td>
                <InputField
                    name={fieldName}
                    path={name}
                    value={value[fieldName]}
                    options={options}
                    dispatch={dispatchAddress}
                />
            </td>
        </tr>;
    }

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

export default React.memo(Address);
