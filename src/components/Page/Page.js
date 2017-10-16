import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Page extends React.Component {
    render() {
        return <div className="page">
            {...this.props.children}
        </div>
    }
}

const matchStateToProps = state => ({
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(Page);
