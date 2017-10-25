import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';

/**
 * @description Cell consist of `CellBody`, `CellHeader` and `CellFooter` for flexible reason
 * @example
 * import React from 'react';
 * import {
 *     Cells,
 *     CellsTitle,
 *     Cell,
 *     CellHeader,
 *     CellBody,
 *     CellFooter,
 * } from '../../../build/packages';
 * import Page from '../../component/page';
 * import iconSrc from './images/icon.png';
 * const ListDemo = (props) => (
 *     <Page className="cell" title="List" subTitle="列表">
 *         <CellsTitle>List with description</CellsTitle>
 *         <Cells>
 *             <Cell>
 *                 <CellBody>
 *                     Title
 *                 </CellBody>
 *                 <CellFooter>
 *                     Description
 *                 </CellFooter>
 *             </Cell>
 *         </Cells>
 *         <CellsTitle>List with Icon & Description</CellsTitle>
 *         <Cells>
 *             <Cell>
 *                 <CellHeader>
 *                     <img src={iconSrc} alt="" style={{display: `block`, width: `20px`, marginRight: `5px`}}/>
 *                 </CellHeader>
 *                 <CellBody>
 *                     Title
 *                 </CellBody>
 *                 <CellFooter>
 *                     Description
 *                 </CellFooter>
 *             </Cell>
 *             <Cell>
 *                 <CellHeader>
 *                     <img src={iconSrc} alt="" style={{display: `block`, width: `20px`, marginRight: `5px`}}/>
 *                 </CellHeader>
 *                 <CellBody>
 *                     Title
 *                 </CellBody>
 *                 <CellFooter>
 *                     Description
 *                 </CellFooter>
 *             </Cell>
 *         </Cells>
 *         <CellsTitle>List with link</CellsTitle>
 *         <Cells>
 *             <Cell href="javascript:;" access>
 *                 <CellBody>
 *                     Title
 *                 </CellBody>
 *                 <CellFooter/>
 *             </Cell>
 *             <Cell access>
 *                 <CellBody>
 *                     Title
 *                 </CellBody>
 *                 <CellFooter/>
 *             </Cell>
 *         </Cells>
 *         <CellsTitle>List with title & link</CellsTitle>
 *         <Cells>
 *             <Cell href="javascript:;" access>
 *                 <CellBody>
 *                     Title
 *                 </CellBody>
 *                 <CellFooter>
 *                     Description
 *                 </CellFooter>
 *             </Cell>
 *             <Cell access>
 *                 <CellBody>
 *                     Title
 *                 </CellBody>
 *                 <CellFooter>
 *                     Description
 *                 </CellFooter>
 *             </Cell>
 *         </Cells>
 *         <CellsTitle>List with Icon & Link</CellsTitle>
 *         <Cells>
 *             <Cell href="javascript:;" access>
 *                 <CellHeader>
 *                     <img src={iconSrc} alt="" style={{display: `block`, width: `20px`, marginRight: `5px`}}/>
 *                 </CellHeader>
 *                 <CellBody>
 *                     Title
 *                 </CellBody>
 *                 <CellFooter>
 *                     Description
 *                 </CellFooter>
 *             </Cell>
 *             <Cell access>
 *                 <CellHeader>
 *                     <img src={iconSrc} alt="" style={{display: `block`, width: `20px`, marginRight: `5px`}}/>
 *                 </CellHeader>
 *                 <CellBody>
 *                     Title
 *                 </CellBody>
 *                 <CellFooter>
 *                     Description
 *                 </CellFooter>
 *             </Cell>
 *         </Cells>
 *     </Page>
 * );
 * export default ListDemo;
 */

const Cell = (props) => {
    const { className, children, access, href, link, component, htmlFor, ...others } = props;
    const DefaultComponent = href ? 'a' : htmlFor ? 'label' : 'div';
    var CellComponent = component ? component : DefaultComponent;

    const cls = classNames({
        'weui-cell': true,
        'weui-cell_access': access,
        'weui-cell_link': link,
        [className]: className
    });

    return (
        <CellComponent
            className={cls}
            href={href}
            htmlFor={htmlFor}
            { ...others }
        >
            { children }
        </CellComponent>
    );
};

Cell.propTypes = {
    /**
     * @property {PropTypes.bool} access - if cell should have arrow or link
     *
     */
    access: PropTypes.bool,
    /**
     * @property {PropTypes.bool} link - if this cell body is link
     *
     */
    link: PropTypes.bool,
    /**
     * @property {PropTypes.func} component - pass in an component to replace Cell but apply same style
     *
     */
    component: PropTypes.func
};

Cell.defaultProps = {
    access: false,
    link: false,
};

export default Cell;
