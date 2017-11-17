import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Tabs} from '../';

export class Sidebar extends Component {
    render() {
        return (
            <aside>
                <Tabs>
                    {this.props.children}
                </Tabs>
            </aside>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
