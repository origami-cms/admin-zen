import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

import actions from 'actions';
const {App: AppActions} = actions;

import {Icon} from 'components/ui';


class HeaderTabs extends React.Component {

    // Generate a tab
    tab(t) {
        const active = t.url === this.props.location.pathname
        const classes = {
            tab: true,
            active
        };
        const color = active ? 'alt' : 'shade-3';

        return <li
            className={classnames(classes)}
            key={t.url}
        >
            <Link to={t.url}>
                {t.type && <Icon type={t.type} color={color} />}
                {t.name}
                <Icon type='cross' color={color} onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.close(t);
                }}/>
            </Link>
        </li>;
    }

    // Close a tab
    close({url}) {
        this.props.actions.tabsClose(url);
        this.props.history.replace('/');
    }

    render() {
        return <ul className="tabs float-left">
            {this.props.tabs.map(this.tab.bind(this))}
        </ul>;
    }
}

const mapStateToProps = state => ({
    tabs: state.App.tabs
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...AppActions
    }, dispatch)
});

export default withRouter(
    connect(mapStateToProps, matchDispatchToProps)(HeaderTabs)
);
