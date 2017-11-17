import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import classnames from 'classnames';


import logo from 'images/logo-mark.svg';
import actions from 'actions';
const {App: AppActions} = actions;
import Icon from '../Icon';

class Jewel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            active: false
        };
    }

    componentDidMount() {
        this.props.actions.getJewelItems();
    }


    render() {
        const classes = {
            active: this.state.active
        };

        return <div
            className={classnames("jewel no-select", classes)}
            onClick={this.toggleActive.bind(this)}
        >
            <img src={logo} />
            <div className="items">
                {this.props.jewelItems.map(i =>
                    <Link to={i.url} key={i.url} className="round button no-border">
                        <Icon type={i.icon} color="white" size="large" />
                    </Link>
                )}
            </div>
        </div>;
    }

    toggleActive() {
        this.setState({active: !this.state.active});
    }
}

const matchStateToProps = state => ({
    jewelItems: state.App.jewelItems
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...AppActions
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(Jewel);
