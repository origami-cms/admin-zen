import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import {Icon} from 'components/ui';

export default class Modal extends React.Component {
    static propTypes = {
        onClose: PropTypes.func,
        title: PropTypes.string,
        closeButton: PropTypes.bool
    }

    static defaultProps = {
        closeButton: true
    }

    constructor(props) {
        super(props);

        this.state = {
            open: true
        };
    }

    render() {
        const {title, closeButton} = this.props;

        return <ReactModal
            isOpen={this.state.open}
            className={{
                base: 'modal',
                afterOpen: 'open',
                beforeClose: 'close'
            }}
            overlayClassName={{
                base: 'modal-overlay',
                afterOpen: 'open',
                beforeClose: 'close'
            }}
            onRequestClose={this.close.bind(this)}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={500}
        >
            {title && <h2>{title}</h2>}
            {closeButton && <Icon type="cross" size="super" onClick={() => this.close()}/>}
            {this.props.children}
        </ReactModal>;
    }

    close() {
        const closeTime = 500;
        this.setState({open: false});
        if (this.props.onClose) setTimeout(() => {
            this.props.onClose();
        }, closeTime);
    }
}
