import React from 'react';
import PropTypes from 'prop-types';
import {singular, plural} from 'pluralize';
import CODES from 'http-status-codes';
import {upperFirst} from 'lodash';
import {withRouter} from 'react-router';


import {Main} from 'components/structure';
import {Loader, Icon, Button} from 'components/ui';


export default withRouter(class PageContent extends React.Component {
    static propTypes = {
        resource: PropTypes.string.isRequired,
        loading: PropTypes.bool,
        error: PropTypes.oneOf([
            CODES.NOT_FOUND,
            CODES.INTERNAL_SERVER_ERROR,
            'no-data'
        ])
    }
    get resource() {
        return this.props.resource || '';
    }

    get resSingular() {
        return singular(this.props.resource);
    }
    get resPlural() {
        return plural(this.props.resource);
    }

    get content() {
        if (this.props.loading) return <Loader />;
        let error;
        let action = null;
        const actionBack = <Button color="alt" onClick={() => this.props.history.goBack()}> Go back </Button>;

        switch (this.props.error) {
            case CODES.NOT_FOUND:
                error = `${this.resource} Not Found`;
                action = actionBack;
                break;
            case CODES.INTERNAL_SERVER_ERROR:
                error = `Error finding ${this.resource || 'resource'}`;
                action = actionBack;
                break;
            case 'no-data':
                error = `No ${this.resPlural} found`;
                action = <Button
                    color="alt"
                    to={`/${this.resPlural}/create`}
                    icon="add"
                > Create {this.resSingular} </Button>;
                break;
            default:
                return this.props.children;
        }

        return <Main className="text-center">
            {this.resource && <Icon type={this.resource} size="hero" color="alt"/>}
            <h2 className="margin-b-main"> {upperFirst(error.toLowerCase().trim())} </h2>
            {action}
        </Main>;
    }
    render() {
        return <div className="content cover">
            {this.content}
        </div>;
    }
});
