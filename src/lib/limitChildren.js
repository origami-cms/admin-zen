import React from 'react';

export default valid =>
    (props, propName, componentName) => {
        const prop = props[propName];

        let error = null;
        React.Children.forEach(prop, child => {
            if (!valid.includes(child.type)) {
                error = new Error(`'${componentName}' children should be of type 'Tab'.`);
            }
        });

        return error;
    };
