import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Modal, PageTree} from 'components/ui';
import actions from 'actions';
const {Pages: PageActions} = actions;


class ModalReorganisePage extends React.Component {
    static propTypes = {
        onClose: PropTypes.func,
        selected: PropTypes.array.isRequired
    }

    static defaultProps = {
        closeButton: true
    }

    get title() {
        return this.props.selected.length > 1 ? 'Move pages' : 'Move page';
    }

    render() {

        return <Modal
            onClose={this.props.onClose}
            title={this.title}
        >
            <PageTree onSelect={this.select.bind(this)} selected={this.props.selected}/>
        </Modal>;
    }

    select({id: parent}) {
        this.props.actions.pagesTreeMove(this.props.selected, parent);
    }
}

const matchStateToProps = () => ({});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...PageActions
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(ModalReorganisePage);
