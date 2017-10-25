//1.0.0 components

import React from 'react';

/**
 * @description FlexItem Container
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

const Flex = (props) => (
    <div className="weui-flex" {...props}>
        { props.children }
    </div>
);

export default Flex;