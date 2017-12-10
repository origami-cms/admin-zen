import React from 'react'; // eslint-disable-line
import classnames from 'classnames';
import {withRouter} from 'react-router';


import {Icon, Loader} from 'components/ui';


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
            iconColor,
            children,
            disabled,
            loading
        } = this.props;

        const classes = {
            [color]: true
        };

        if (size) classes[size] = true;
        if (icon || loading) classes['has-icon'] = true;
        if (!children) classes['no-text'] = true;

        return <button
            className={classnames(classes, this.props.className)}
            onClick={this.onClick.bind(this)}
            disabled={disabled || loading}
        >
            {icon && !loading && <Icon type={icon} color={iconColor} size='large'/>}
            {loading && <Loader color={iconColor} size='main'/>}
            <span>{children}</span>
        </button>;
    }

    onClick(e) {
        if (this.props.onClick) this.props.onClick(e);
        else if (this.props.to) this.props.history.push(this.props.to);
    }
}

export default withRouter(Button);
