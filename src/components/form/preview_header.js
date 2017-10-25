//1.0.0 components

import React from 'react';
import classNames from '../../utils/classnames';

/**
 * @description Header of Preview
 */

const PreviewHeader = (props) => {

    const { className, children, ...others } = props;
    const cls = classNames({
        'weui-form-preview__hd': true,
        [className]: className
    });

    return (
        <div className={cls} {...others}>
            { children }
        </div>
    );
};

export default PreviewHeader;