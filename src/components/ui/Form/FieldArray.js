import React from 'react';
import PropTypes from 'prop-types';


import {Button} from 'components/ui';
import {FormField} from './';


export default class FieldArray extends React.Component {
    static propTypes = {
        value: PropTypes.array.isRequired,
        items: PropTypes.object.isRequired
    }
    render() {
        const {
            value
        } = this.props;

        return value.map((v, i) =>
            <FormField
                key={i}
                type={this.props}
                value={v}
                onChange={_v => this.change(i, _v)}
                buttons={this.buttons(i)}
            />
        );
    }

    buttons(i) {
        const buttons = [];
        if (i != 0) buttons.push(
            <Button icon="arrow-up" color="alt" onClick={() => this.up(i)} />
        );
        if (i != this.props.value.length - 1) {
            buttons.push(
                <Button icon="arrow-down" color="alt" onClick={() => this.down(i)} />
            );
        } else buttons.push(
            <Button icon="add" color="success" onClick={() => this.add(i)} />
        );

        buttons.push(
            <Button icon="remove" color="error" onClick={() => this.remove(i)} />
        );

        return buttons;
    }

    change(i, v) {
        const newValues = [...this.props.value];
        newValues[i] = v;
        this.props.onChange(newValues);
    }

    up() {}
    down() {}
    add() {}
    remove() {}
}
