import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.bool
    }

    render() {
        const {
            onChange,
            value
        } = this.props;

        return <label className="checkbox">
            <input type="checkbox" onChange={onChange} checked={value}/>
            <span />
        </label>;
    }
}
