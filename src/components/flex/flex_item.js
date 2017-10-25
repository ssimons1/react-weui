//1.0.0 components

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Evenly distribute flex items
 * @example
 * import React from 'react';
 * import {
 *     Flex,
 *     FlexItem
 * } from '../../../build/packages';
 * import Page from '../../component/page';
 * const FlexDemo = (props) => (
 *     <Page className="flex" title="Flex" subTitle="Flex布局" spacing>
 *         <Flex>
 *             <FlexItem>
 *                 <div className="placeholder">weui</div>
 *             </FlexItem>
 *         </Flex>
 *         <Flex>
 *             <FlexItem>
 *                 <div className="placeholder">weui</div>
 *             </FlexItem>
 *             <FlexItem>
 *                 <div className="placeholder">weui</div>
 *             </FlexItem>
 *         </Flex>
 *         <Flex>
 *             <FlexItem>
 *                 <div className="placeholder">weui</div>
 *             </FlexItem>
 *             <FlexItem>
 *                 <div className="placeholder">weui</div>
 *             </FlexItem>
 *             <FlexItem>
 *                 <div className="placeholder">weui</div>
 *             </FlexItem>
 *         </Flex>
 *         <Flex>
 *             <FlexItem>
 *                 <div className="placeholder">weui</div>
 *             </FlexItem>
 *             <FlexItem>
 *                 <div className="placeholder">weui</div>
 *             </FlexItem>
 *             <FlexItem>
 *                 <div className="placeholder">weui</div>
 *             </FlexItem>
 *             <FlexItem>
 *                 <div className="placeholder">weui</div>
 *             </FlexItem>
 *         </Flex>
 *     </Page>
 * );
 * export default FlexDemo;
 *
 */

const FlexItem = (props) => {
    const { component, children, ...others } = props;
    return (
        <component className="weui-flex__item" {...others}>
            { children }
        </component>
    );
};

FlexItem.propTypes = {
    /**
     * @property {PropTypes.node} component - pass component to replace the component but maintaing style
     *
     */
    component: PropTypes.node
};

FlexItem.defaultProps = {
    component: 'div'
};

export default FlexItem;
