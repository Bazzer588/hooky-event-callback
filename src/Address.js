import React from 'react';
import useEventCallback from './useEventCallback';
import InputField from './InputField';
import Countries from './data/data-countries.json';
import CanadaProvince from './data/data-canada.json';
import USAStates from './data/data-usa.json';

function Address ({ name, value = {}, onChangeField }) {

    // console.log('A',name);

    const onChangeEv = useEventCallback( (changed,newValue) => {
        const mod = { ...value, [changed]: newValue };
        if (changed==='country') {
            mod.province = mod.address = mod.zip = '';  // if changing country, reset the province or state
            if (newValue==='GB') {
                mod.province = 'Somerset';
            }
        }
        onChangeField(name,mod);
    });

    const country = value.country;

    return (
        <div>
            <p><b>{name}</b></p>
            <table className="Address">
                <tbody>
                <tr><th>Country</th><td><InputField name="country" path={name} value={country} options={Countries} onChangeField={onChangeEv} /></td></tr>
                <tr><th>State / Province </th><td><InputField name="province" path={name} value={value.province} options={regions[country]} onChangeField={onChangeEv} /></td></tr>
                <tr><th>Address</th><td><InputField name="address" path={name} value={value.address} onChangeField={onChangeEv} /></td></tr>
                <tr><th>{zipLabel[country] || 'Zip Code'}</th><td><InputField name="zip" path={name} value={value.zip} onChangeField={onChangeEv} /></td></tr>
                </tbody>
            </table>
        </div>
    );

}

const regions = {  // eslint-disable-line no-unused-vars
    US: USAStates,
    CA: CanadaProvince
};

const zipLabel = {
    GB: 'Post code',
    CN: '邮政编码'
};

export default React.memo(Address);

/*
            <p>Country <InputField name="country" path={name} value={country} options={Countries} onChangeField={onChangeEv} /></p>
            <p>State / Province <InputField name="province" path={name} value={value.province} options={regions[country]} onChangeField={onChangeEv} /></p>
            <p>Address <InputField name="address" path={name} value={value.address} onChangeField={onChangeEv} /></p>
            <p>Zip Code <InputField name="zip" path={name} value={value.zip} onChangeField={onChangeEv} /></p>

 */
