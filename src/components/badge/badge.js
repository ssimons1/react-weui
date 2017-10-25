import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';

const presetStyles = {
    'default': {},
    'header': {
        position: 'absolute',
        top: '-.4em',
        right: '-.4em'
    },
    'body': {
        marginLeft: '5px'
    },
    'footer': {
        marginLeft: '5px',
        marginRight: '5px'
    }
};
/**
 * @description Small status descriptors for UI elements.
 * @example
 * import React from 'react';
 * import {
 *     Badge, Cells, Cell, CellBody, CellFooter, CellHeader, CellsTitle
 * } from '../../../build/packages';
 * import Page from '../../component/page';
 * import iconSrc from '../list/images/icon.png';
 * const BadgeDemo = (props) => (
 *     <Page className="badge" title="Badge" subTitle="徽章">
 *         <CellsTitle>Footer Notification Badge</CellsTitle>
 *         <Cells>
 *             <Cell access>
 *                 <CellBody>Label</CellBody>
 *                 <CellFooter>
 *                     Details
 *                     <Badge dot preset="footer" />
 *                 </CellFooter>
 *             </Cell>
 *         </Cells>
 *         <CellsTitle>Header & Body Badge</CellsTitle>
 *         <Cells>
 *             <Cell>
 *                 <CellHeader style={{position: 'relative', marginRight: '10px'}}>
 *                     <img src={iconSrc} style={{width: '50px', display: 'block'}} />
 *                     <Badge preset="header">8</Badge>
 *                 </CellHeader>
 *                 <CellBody>
 *                     <p>Contact Name</p>
 *                     <p style={{fontSize: '13px', color: '#888888'}}>Descriptions</p>
 *                 </CellBody>
 *             </Cell>
 *             <Cell access>
 *                 <CellBody>
 *                     Label
 *                     <Badge preset="body">8</Badge>
 *                 </CellBody>
 *                 <CellFooter />
 *             </Cell>
 *             <Cell access>
 *                 <CellBody>
 *                     Label
 *                     <Badge preset="body">8</Badge>
 *                 </CellBody>
 *                 <CellFooter>
 *                     Details
 *                 </CellFooter>
 *             </Cell>
 *             <Cell access>
 *                 <CellBody>
 *                     Label
 *                     <Badge preset="body">new</Badge>
 *                 </CellBody>
 *                 <CellFooter />
 *             </Cell>
 *         </Cells>
 *     </Page>
 * );
 * export default BadgeDemo;
 *
 */

class Badge extends Component {

    static propTypes = {
        /**
         * @property {PropTypes.bool} dot - display dot style without content
         *
         */
        dot: PropTypes.bool,
        /**
         * @property {PropTypes.string} preset - some preset layout for other UI elements, include 'header', 'body', 'footer'
         *
         */
        preset: PropTypes.string,
    };

    static defaultProps = {
        dot: false,
        preset: 'default'
    }

    render() {
        const { children, className, dot, style, preset, ...domProps } = this.props;
        let clz = classNames('weui-badge', {
            'weui-badge_dot': dot
        }, className);

        let stylez = Object.assign({}, presetStyles[preset], style);
        return <span className={clz} style={stylez} {...domProps}>{children}</span>;
    }
}

export default Badge;
