import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import immutable from 'seamless-immutable';
import _ from 'lodash';

import {Checkbox, Icon} from 'components/ui';


export default class ResourceTable extends React.Component {
    static propTypes = {
        onRowClick: PropTypes.func,
        onChange: PropTypes.func,
        striped: PropTypes.bool,
        dataId: PropTypes.string
    }

    static defaultProps = {
        dataId: 'id',
        striped: false
    }

    constructor(props) {
        super(props);

        this.state = {
            selected: immutable([])
        };
    }


    get allSelected() {
        if (!this.props.data.length) return false;

        return this.state.selected.length === this.props.data.length;
    }

    componentDidUpdate(props, state) {
        if (state.selected != this.state.selected && this.props.onChange) {
            const data = this.props.data.filter(
                d => this.state.selected.includes(d[this.props.dataId])
            );
            this.props.onChange(data);
        }
    }


    render() {
        const classes = {
            striped: this.props.striped,
            'rows-split': true,
            'no-select': true
        };

        return <table className={classnames(classes, this.props.className)}>
            <tbody>
                {this.header}
                {this.rows}
            </tbody>
        </table>;
    }


    get header() {
        return <tr className="row-header">
            <th className="icon">
                <Checkbox onChange={this.selectAll.bind(this)} value={this.allSelected}/>
            </th>
            {React.Children.map(this.props.children, (col, i) => <th key={i}>
                {col.props.heading || col.props.dataKey}
            </th>)}
            <th className="icon" />
        </tr>;
    }

    get rows() {
        const {selected} = this.state;
        const {dataId} = this.props;

        return this.props.data.map((entry, i) => {
            const id = entry[dataId];

            return <tr key={i}>
                <td className="icon">
                    <Checkbox
                        value={selected.includes(id)}
                        onClick={e => this.select(e, id, i)}
                    />
                </td>

                {React.Children.map(this.props.children, (col, j) => <td key={j}>
                    {entry[col.props.dataKey]}
                </td>)}

                <td className="icon" onClick={() => this.onRowClick(entry)}>
                    <Icon type='arrow-right' color="alt"/>
                </td>
            </tr>;
        });
    }

    onRowClick(row) {
        if (this.props.onRowClick) this.props.onRowClick(row);
    }

    selectAll({target: {checked}}) {
        this.setState({
            selected: checked ? this.props.data.map(d => d[this.props.dataId]) : []
        });
    }

    select(e, id, i) {
        const {selected: s} = this.state;
        const turnOff = s.includes(id);

        if (e.shiftKey) {
            if (!this.state.clickIndex) this.setState({clickIndex: i});

            const d = this.props.data;
            let i1 = this.state.clickIndex;
            let i2 = i;

            if (i1 != null) {
                // Flip indexes if i1 is larger
                [i1, i2] = [i1, i2].sort();

                const select = d.slice(i1, i2 - i1 + 1).map(_e => _e.id);

                if (this.state.clickOff) {
                    this.setState({selected: _.uniq(s.filter(_e => !select.includes(_e)))});
                } else {
                    this.setState({selected: _.uniq(s.concat(select))});
                }
            }
        } else {
            // Reset the clickIndex if no shift key is pressed
            this.setState({clickIndex: i, clickOff: turnOff});
            if (turnOff) {
                this.setState({selected: s.filter(_id => id != _id)});
            } else {
                this.setState({selected: s.concat(id)});
            }
        }
    }
}
