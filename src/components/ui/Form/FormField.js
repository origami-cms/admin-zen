import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import {
    Input,
    FieldArray,
    Editor
} from './';


import {Icon, Button} from 'components/ui';


const SUPPORTED_TYPES = [
    'text',
    'number',
    'url',
    'email',
    'password',
    'tel',
    'color',

    'textarea',
    'radio',
    'select',
    'checkbox',

    'array'
];

export default class FormField extends React.Component {

    static propTypes = {
        type: PropTypes.oneOf(SUPPORTED_TYPES).isRequired,
        name: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.any,
        buttons: PropTypes.arrayOf(Button)
    }


    render() {
        const classes = {
            disabled: this.props.disabled,
            error: this.props.error
        };

        return <label className={classnames('form-row', classes)}>
            {this.label}
            {this.element}
            {this.props.buttons}
        </label>;
    }


    get label() {
        if (!this.props.label) return null;
        else return <span>{this.props.label}</span>;
    }


    get element() {
        const props = {
            placeholder: this.props.placeholder,
            type: this.props.type,
            disabled: this.props.disabled,
            onChange: this.props.onChange,
            value: this.props.value
        };

        let ele = null;

        switch (this.props.type) {
            case 'array':
                ele = <FieldArray {...props} />;
                break;

            case 'textarea':
                ele = <Editor {...props}/>;
                // Ele = <textarea {...props} onChange={e => {
                //     props.onChange(e.target.value);
                // }} />;
                break;

            default:
                ele = <Input {...props}/>;
        }

        if (!this.props.icon) return ele;
        else return [<Icon type={this.props.icon} size='large'/>, ele];
    }

}
