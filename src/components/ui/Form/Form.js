import React from 'react';
import classnames from 'classnames';


import {FormField} from './';
import {Button} from 'components/ui';


export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: props.values || {}
        };
    }

    fields(fields = this.props.fields) {
        if (!fields) return null;

        // If it's a list of fields, generate the form rows
        if (fields instanceof Array) return fields.map((f, i) => {
            const value = this.state ? this.state.values[f.name] : null;
            if (f.type === 'submit') return <Button
                {...f}
                disabled={this.props.disabled}
                loading={this.props.disabled}
                key={i}
            >{f.value || 'Submit'}</Button>;

            else return <FormField
                key={i}
                {...f}
                value={value}
                onChange={v => this.onChange(f.name, v)}
                disabled={this.props.disabled}
            />;
        });


        // If it's an object with fieldsets, loop over them, and recursively
        // add fields into a fieldset with a legend
        else return Object.entries(fields).map(([legend, _fields]) =>
            <fieldset key={legend}>
                <legend>{legend}</legend>
                {this.fields(_fields)}
            </fieldset>
        );
    }

    set values(values) {
        return this.setState({values});
    }
    get values() {
        return this.state.values;
    }


    render() {
        const {error} = this.props;
        const classes = {};

        return <form
            noValidate={true}
            className={classnames(classes, this.props.className)}
            onSubmit={this.onSubmit.bind(this)}
        >
            <span className="form-row color-error margin-b-small">{error}</span>
            {this.fields()}
        </form>;
    }

    // Update the state, and call the onChange callback if supplied
    onChange(name, v) {
        this.setState({values: {
            ...this.state.values,
            [name]: v
        }}, () => {
            if (this.props.onChange) this.props.onChange(this.values);
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state.values);
    }
}
