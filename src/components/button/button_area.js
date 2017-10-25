import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';

/**
 * @description ButtonArea component
 * @example
 * import React from 'react';
 * import {Button, ButtonArea} from '../../../build/packages';
 * import Page from '../../component/page';
 * import './button.less';
 * export default class ButtonDemo extends React.Component {
 *     render() {
 *         return (
 *             <Page className="button" title="Button" subTitle="按钮" spacing>
 *                 <Button>Normal</Button>
 *                 <Button disabled>Disabled</Button>
 *                 <ButtonArea>
 *                     <Button type="default">Secondary Normal</Button>
 *                     <Button type="default" disabled>Secondary Disabled</Button>
 *                 </ButtonArea>
 *                 <ButtonArea direction="horizontal">
 *                     <Button type="warn">Warn Normal</Button>
 *                     <Button type="warn" disabled>Disabled</Button>
 *                 </ButtonArea>
 *                 <div className="button-sp-area">
 *                     <Button type="primary" plain>Button</Button>
 *                     <Button type="primary" plain disabled>Button</Button>
 *                     <Button type="default" plain>Button</Button>
 *                     <Button size="small">Mini</Button>
 *                     <Button type="default" size="small">Mini</Button>
 *                     <Button type="warn" size="small">Mini</Button>
 *                 </div>
 *             </Page>
 *         );
 *     }
 * };
 */

class ButtonArea extends Component {
    static propTypes = {
        /**
         * @property {PropTypes.string} direction - Direction of Button Layout inside, Options: veritical, horizontal
         *
         */
        direction: PropTypes.string
    };

    static defaultProps = {
        direction: 'vertical'
    };

    render() {
        const {direction, children, className} = this.props;
        const cls = classNames({
            'weui-btn-area': true,
            'weui-btn-area_inline': direction === 'horizontal',
            [className]: className
        });

        return (
            <div className={cls}>
                {children}
            </div>
        );
    }
};

export default ButtonArea;
