import React from 'react';
import classnames from 'classnames';
import {Tab} from './Tab';
import {Icon} from '../';
import limitChidren from 'lib/limitChildren';

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
    }

    static propTypes = {
        children: limitChidren([Tab])
    }
    render() {
        const items = React.Children.map(this.props.children, (c, i) => {
            const classes = {
                tab: true,
                'icon-only': !c.name
            };

            return <li className={classnames(classes)} onClick={() => this.select(i)}>
                <Icon type={c.props.icon} color="white" />
            </li>;
        });

        return <div className="tabs">
            <header>
                <ul>
                    {items}
                </ul>
            </header>
            <div className="content">
                {this.props.children[this.state.selected]}
            </div>
        </div>;
    }

    select(selected) {
        this.setState({selected});
    }
}
