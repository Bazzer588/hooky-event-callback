import CountryList from './data-countries.json';
import CanadaProvinces from './data-canada.json';
import USAStates from './data-usa.json';

export const regions = {
    US: USAStates,
    CA: CanadaProvinces
};

export const zipLabel = {
    GB: 'Post code',
    CN: '邮政编码'
};

export const Countries = CountryList;
