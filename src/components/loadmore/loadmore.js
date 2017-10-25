import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import Icon from '../icon';

/**
 * @description Loadmore Indicators.
 * @example
 * import React from 'react';
 * import { LoadMore } from '../../../build/packages';
 * import Page from '../../component/page';
 * const LoadMoreDemo = (props) => {
 *     return (
 *         <Page className="loadmore" title="Loadmore" subTitle="加载更多" spacing>
 *            <LoadMore loading>Loading</LoadMore>
 *            <LoadMore showLine>No Data</LoadMore>
 *            <LoadMore showLine showDot />
 *         </Page>
 *     );
 * };
 * export default LoadMoreDemo
 *
 */

const LoadMore = (props) => {

    const { className, children, loading, showLine, showDot, ...others } = props;
    const cls = classNames({
        'weui-loadmore': true,
        'weui-loadmore_line': showLine,
        'weui-loadmore_dot': showDot,
        [className]: className
    });

    return (
        <div className={cls} {...others}>
            { loading ? <Icon value='loading' /> : false }
            <span className="weui-loadmore__tips">
            { children }
            </span>
        </div>
    );
};

LoadMore.propTypes = {
    /**
     * @property {PropTypes.bool} loading - display laoding spinner
     *
     */
    loading: PropTypes.bool,
    /**
     * @property {PropTypes.bool} showLine - display side lines
     *
     */
    showLine: PropTypes.bool,
    /**
     * @property {PropTypes.bool} showDot - display dot in the center
     *
     */
    showDot: PropTypes.bool
};

LoadMore.defaultProps = {
    loading: false,
    showLine: false,
    showDot: false
};

export default LoadMore;
