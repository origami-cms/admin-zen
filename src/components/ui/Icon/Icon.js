import React from 'react'; // eslint-disable-line
import classnames from 'classnames';


import icons from 'icons';


export default props => {
    const {
        type,
        color,
        size,
        className,
        onClick
    } = props;

    return <svg className={classnames('i', color, size, className)} onClick={onClick}>
        <use xlinkHref={`${icons}#${type}`} />
    </svg>;
};
