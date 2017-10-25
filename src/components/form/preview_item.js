//1.0.0 components

import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';

/**
 * @description Preview Item for all purpose usage
 *
 */
const PreviewItem = (props) => {

    const { className, label, value, ...others } = props;
    const cls = classNames({
        'weui-form-preview__item': true,
        [className]: className
    });

    return (
        <div className={cls} {...others}>
            <label className="weui-form-preview__label">{label}</label>
            <em className="weui-form-preview__value">{value}</em>
        </div>
    );
};

PreviewItem.propTypes = {
    /**
     * @property {PropTypes.string} label - The label of item
     *
     */
    label: PropTypes.string,
    /**
     * @property {PropTypes.string} value - Value of the label
     *
     */
    value: PropTypes.string,

};

PreviewItem.defaultProps = {
    label: false,
    value: false,
};

export default PreviewItem;
