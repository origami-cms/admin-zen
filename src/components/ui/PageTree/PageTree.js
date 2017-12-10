import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';

import actions from 'actions';
import {Loader} from 'components/ui';

export class PageTree extends React.Component {
    static propTypes = {
        selected: PropTypes.array,
        onSelect: PropTypes.func
    }

    static defaultProps = {
        selected: []
    }

    componentDidMount() {
        this.props.actions.pagesTreeGet();
    }

    get pages() { return this.props.pageTree; }

    page(p, i, depth = 0) {
        const classes = {
            [`depth-${depth}`]: true,
            disabled: Boolean(this.props.selected.find(_p => _p.id === p.id))
        };

        const pages = [<li
            key={i}
            className={classnames(classes)}
            onClick={() => this.select(p)}
        > {p.title} </li>];

        if (p.children) return pages.concat(p.children.map((c, j) =>
            this.page(c, `${i}.${j}`, depth + 1)
        ));
        else return pages;
    }

    render() {
        if (!this.props.pageTree) return <Loader />;
        else return <ul className="page-tree list selectable">
            {this.pages.map((c, i) =>
                this.page(c, i, 0)
            )}
        </ul>;
    }

    select(p) {
        if (this.props.onSelect) this.props.onSelect(p);
    }
}

const mapStateToProps = state => ({
    pageTree: state.Pages.pageTree
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        pagesTreeGet: actions.Pages.pagesTreeGet
    }, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(PageTree);
