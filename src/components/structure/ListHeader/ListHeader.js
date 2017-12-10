import React from 'react';
import {singular, plural} from 'pluralize';
import {upperFirst} from 'lodash';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import A from 'actions';
let actions = {};
Object.values(A).forEach(a => {
    actions = {...actions, ...a};
});


import {ModalConfirm} from 'components/structure';
import {Button} from 'components/ui';

class ListHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            removing: false
        };
    }

    static propTypes = {
        data: PropTypes.array.isRequired,
        resource: PropTypes.string.isRequired,
        selected: PropTypes.array
    }

    get resSingular() {
        return singular(this.props.resource);
    }
    get resPlural() {
        return plural(this.props.resource);
    }

    get data() { return this.props.data; }
    get selected() { return this.props.selected; }

    get buttons() {
        const {length} = this.selected;
        const buttons = [];

        const b = (icon, color, text, toOrClick) => {
            const props = {};
            if (typeof toOrClick === 'string') props.to = toOrClick;
            else props.onClick = toOrClick;
            buttons.push(<Button
                icon={icon} color={color} key={buttons.length} {...props}
            >{text}</Button>);
        };

        if (!length) {
            b('add', 'alt', `Create ${this.resSingular}`, `/${this.resPlural}/create`);
        } else {
            if (length === 1) b('arrow-right', 'alt', null, `/${this.resPlural}/${this.selected[0].id}`);
            b('remove', 'error', null, () => this.setState({removing: true}));
        }

        return buttons;
    }

    remove() {
        return this.props.actions[`${this.resPlural}Remove`](this.selected.map(i => i.id));
    }

    render() {
        const metric = this.data.length === 1 ? this.resSingular : this.resPlural;
        const metricSelected = this.props.selected.length === 1 ? this.resSingular : this.resPlural;

        return <header>
            <h2> {upperFirst(this.resPlural)} </h2>
            <small className="uppercase color-shade-3">
                <strong>{this.data.length} {metric}</strong>
            </small>
            <div className="button-group float-right">
                {this.buttons}
                {this.props.children}
            </div>
            {this.state.removing && <ModalConfirm
                onClose={() => this.setState({removing: false})}
                onConfirm={this.remove.bind(this)}
                title={`Remove ${this.props.selected.length} ${metricSelected}`}
            />}
        </header>;
    }
}


const matchStateToProps = () => ({});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(ListHeader);
