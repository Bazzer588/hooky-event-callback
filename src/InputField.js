import React from 'react';

function InputField ({ name, value = '', path, options, onChangeField, ...props }) {

    console.log('F',path,name,value);

    const id = path+'-'+name;

    function onChange (ev) {
        onChangeField(name,ev.target.value);
    }

    return (
        options ?
            <select id={id} {...props} onChange={onChange} value={value}>
                <option value="" />
                {renderOptions(options)}
            </select>
            :
            <input id={id} type="text" {...props} onChange={onChange} value={value} />
    );
}

function renderOptions (options) {
    const list = Object.keys(options);
    return list.map( (opt) => <option key={opt} value={opt}>{options[opt]}</option> );
}

export default React.memo(InputField);
