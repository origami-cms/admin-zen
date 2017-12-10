import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';


const SUPPORTED_TYPES = [
    'text',
    'number',
    'url',
    'email',
    'password',
    'tel',
    'color'
];


export default class FormField extends React.Component {

    static propTypes = {
        type: PropTypes.oneOf(SUPPORTED_TYPES).isRequired,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.any
    }


    // Convert the type to a valid <input /> type
    get type() {
        switch (this.props.type) {
            case 'url':
                return 'text';

            default:
                return this.props.type;
        }
    }


    render() {
        const props = _.cloneDeep(this.props);
        props.type = this.type;
        props.onChange = this.onChange.bind(this);

        return <input {...props} ref={i => this.input = i}/>;
    }

    // Sends the value instead of the event
    onChange() {
        if (this.props.onChange) this.props.onChange(this.input.value);
    }
}
