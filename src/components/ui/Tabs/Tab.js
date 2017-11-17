import React, {Component} from 'react'; // eslint-disable-line no-unused-vars

export default class Tab extends Component {
    render() {
        return <div className="tab">
            {this.props.children}
        </div>;
    }
}
