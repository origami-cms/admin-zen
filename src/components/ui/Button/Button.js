import React from 'react'; // eslint-disable-line
import classnames from 'classnames';
import {withRouter} from 'react-router';


import {Icon} from 'components/ui';


class Button extends React.Component {
    static defaultProps = {
        color: 'main',
        size: null,
        icon: null,
        iconColor: 'white'
    };
    render() {
        const {
            color,
            size,
            icon,
            iconColor
        } = this.props;

        const classes = {
            [color]: true
        };

        if (size) classes[size] = true;
        if (icon) classes['has-icon'] = true;

        return <button
            className={classnames(classes, this.props.className)}
            onClick={this.onClick.bind(this)}
        >
            {icon && <Icon type={icon} color={iconColor} size='large'/>}
            {this.props.children}
        </button>;
    }

    onClick(e) {
        if (this.props.onClick) this.props.onClick(e);
        else if (this.props.to) this.props.history.push(this.props.to);
    }
}

export default withRouter(Button);
