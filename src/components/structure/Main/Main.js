import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Main extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        className: PropTypes.string
    }
    render() {
        const classes = {
            'center-h': !this.props.sidebar
        };

        return <main className={classnames('rounded padding-super', classes, this.props.className)}>
            <header>
                <h2>{this.props.title}</h2>
            </header>
            {this.props.children}
        </main>;
    }
}
