import React from 'react'; // eslint-disable-line no-unused-vars
import loading from 'raw-loader!origami-icons/icons/loading.svg';
import classnames from 'classnames';

export default props => {
    const {
        color = 'main',
        size,
        className
    } = props;

    return <div
        className={classnames('i loader', color, size, className)}
        dangerouslySetInnerHTML={{__html: loading}}
    />;
};
