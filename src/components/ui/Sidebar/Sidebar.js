import React from 'react';
import {connect} from 'react-redux';

import {Tabs} from '../';

export class Sidebar extends React.Component {
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

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
