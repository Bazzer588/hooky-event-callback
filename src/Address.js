import React, { useReducer } from 'react';
import InputField from './InputField';
import Countries from './data/data-countries.json';
import CanadaProvinces from './data/data-canada.json';
import USAStates from './data/data-usa.json';

const reducerAddress = (name,dispatch) => (state,action) => {
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
        dispatch({ type: 'SET', key: name, value: mod }); // NOT ALLOWED IN REDUX, BUT OK HERE !
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

    const [state, dispatchAddress] = useReducer(reducerAddress(name,dispatch),value);

    function field (fieldName, label, options) {
        return <tr>
            <th>{label}</th>
            <td>
                <InputField
                    name={fieldName}
                    path={name}
                    value={state[fieldName]}
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

const regions = {
    US: USAStates,
    CA: CanadaProvinces
};

const zipLabel = {
    GB: 'Post code',
    CN: '邮政编码'
};

export default React.memo(Address);
