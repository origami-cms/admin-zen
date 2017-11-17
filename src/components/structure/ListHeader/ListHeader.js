import React from 'react';
import {singular, plural} from 'pluralize';
import {upperFirst} from 'lodash';


import {Button} from 'components/ui';


export default props => {
    const {
        resource,
        length
    } = props;

    const resSingular = singular(resource);
    const resPlural = plural(resource);

    const metric = length === 1 ? resSingular : resPlural;

    return <header>
        <h2> {upperFirst(resPlural)} </h2>
        <small className="uppercase color-shade-3">
            <strong>{length} {metric}</strong>
        </small>
        <div className="button-group float-right">
            <Button icon="add" color="alt" to={`/${resPlural}/create`}>Create {resSingular}</Button>
        </div>
    </header>;
};
