import React from 'react';
import PropTypes from 'prop-types';

import {Modal, Button} from 'components/ui';


export default class ModalConfirm extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }


    render() {

        return <Modal
            title={this.props.title}
            onClose={this.props.onClose}
            ref={m => this.modal = m}
        >
            Are you sure you want to remove?
            <div className="button-group">
                <Button onClick={this.confirm.bind(this)} color="success" loading={this.state.loading}>Yes</Button>
                <Button onClick={this.cancel.bind(this)} color="error">No</Button>
            </div>
        </Modal>;
    }

    async confirm() {
        this.setState({loading: true});
        if (this.props.onConfirm) {
            await this.props.onConfirm();
        }
        this.modal.close();
    }
    cancel() {
        if (this.props.onCancel) this.props.onCancel();
        this.modal.close();
    }
}
