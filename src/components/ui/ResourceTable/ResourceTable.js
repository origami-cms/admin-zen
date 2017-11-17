import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class ResourceTable extends React.Component {
    static propTypes = {
        onRowClick: PropTypes.func,
        striped: PropTypes.bool
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
            {React.Children.map(this.props.children, (col, i) => <th key={i}>
                {col.props.heading || col.props.dataKey}
            </th>)}
        </tr>;
    }

    get rows() {
        return this.props.data.map((entry, i) => <tr
            key={i}
            onClick={() => this.onRowClick(entry)}
        >
            {React.Children.map(this.props.children, (col, j) => <td key={j}>
                {entry[col.props.dataKey]}
            </td>)}
        </tr>);
    }

    onRowClick(row) {
        if (this.props.onRowClick) this.props.onRowClick(row);
    }
}
