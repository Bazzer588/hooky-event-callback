import React from 'react';
import useEventCallback from './useEventCallback';
import InputField from './InputField';
import Countries from './data/data-countries.json';
import CanadaProvinces from './data/data-canada.json';
import USAStates from './data/data-usa.json';

function Address ({ name, value = {}, onChangeField }) {

    // console.log('A',name);

    const onChangeEv = useEventCallback( (changed, newValue) => {
        const mod = { ...value, [changed]: newValue };
        if (changed==='country') {
            mod.province = mod.address = mod.zip = '';  // if changing country, reset these
            if (newValue==='GB') {
                mod.province = 'Somerset';
            }
        }
        onChangeField(name,mod); // notify the parent
    }, [value] );

    function field (fieldName, label, options) {
        return <tr>
            <th>{label}</th>
            <td>
                <InputField
                    name={fieldName}
                    path={name}
                    value={value[fieldName]}
                    options={options}
                    onChangeField={onChangeEv} />
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
