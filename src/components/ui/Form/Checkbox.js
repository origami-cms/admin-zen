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
            onClick,
            value
        } = this.props;

        return <label className="checkbox">
            <input type="checkbox" onChange={onChange} onClick={onClick} checked={value}/>
            <span />
        </label>;
    }
}
