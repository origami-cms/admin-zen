import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import {Checkbox, Icon} from 'components/ui';

export default class ResourceTable extends React.Component {
    static propTypes = {
        onRowClick: PropTypes.func,
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
            selected: []
        };
    }


    get allSelected() {
        return this.state.selected.length === this.props.data.length;
    }


    render() {
        const classes = {
            selectable: this.props.onRowClick,
            striped: this.props.striped,
            'rows-split': true
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
                        onChange={() => this.select(id)}
                    />
                </td>

                {React.Children.map(this.props.children, (col, j) => <td key={j}>
                    {entry[col.props.dataKey]}
                </td>)}

                <td className="icon" onClick={() => this.onRowClick(entry)}>
                    <Icon type='arrow-right' />
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

    select(id) {
        const {selected: s} = this.state;
        if (s.includes(id)) {
            this.setState({selected: s.filter(_id => id != _id)});
        } else {
            s.push(id);
            this.setState({selected: s});
        }
    }
}
