import React from 'react';
import CODES from 'http-status-codes';
import {upperFirst} from 'lodash';
import {withRouter} from 'react-router';


import {Main} from 'components/structure';
import {Loader, Icon, Button} from 'components/ui';


export default withRouter(class PageContent extends React.Component {
    get resource() {
        return this.props.resource || '';
    }

    get content() {
        if (this.props.loading) return <Loader />;
        let error;
        switch (this.props.error) {
            case CODES.NOT_FOUND:
                error = `${this.resource} Not Found`;
                break;
            case CODES.INTERNAL_SERVER_ERROR:
                error = `Error finding ${this.resource || 'resource'}`;
                break;
            default:
                return this.props.children;
        }

        return <Main className="text-center">
            {this.resource && <Icon type={this.resource} size="hero" color="alt"/>}
            <h2 className="margin-b-main"> {upperFirst(error.toLowerCase().trim())} </h2>
            <Button color="alt" onClick={() => this.props.history.goBack()}> Go back </Button>
        </Main>;
    }
    render() {
        return <div className="content">
            {this.content}
        </div>;
    }
});
