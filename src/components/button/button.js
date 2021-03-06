import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';

/**
 * @description Button usage：OK(primary)、Cancel(default)、Warn(warn).
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
export default class Button extends React.Component {
    static propTypes = {
        /**
         * @property {PropTypes.bool} disabled
         */
        disabled: PropTypes.bool,
        /**
         * @property {PropTypes.string} type - Options: primary, default, warn, vcode
         *
         */
        type: PropTypes.string,
        /**
         * @property {PropTypes.string} size - Options: normal, small
         *
         */
        size: PropTypes.string,
    };

    static defaultProps = {
        disabled: false,
        type: 'primary',
        size: 'normal',
    };

    render() {
        const { component, type, size, plain, className, children, ...others } = this.props;
        const Component = component ? component : this.props.href || type === 'vcode' ? 'a' : 'button';
        const cls = type === 'vcode' ? classNames('weui-vcode-btn', {[className]: className}) : classNames({
            'weui-btn': true,
            'weui-btn_mini': size === 'small',
            'weui-btn_primary': type === 'primary' && !plain,
            'weui-btn_default': type === 'default' && !plain,
            'weui-btn_warn': type === 'warn',
            'weui-btn_plain-primary': type === 'primary' && plain,
            'weui-btn_plain-default': type === 'default' && plain,
            'weui-btn_disabled': this.props.disabled && !plain,
            'weui-btn_plain-disabled': this.props.disabled && plain,
            [className]: className
        });

        return (
            <Component { ...others } className={ cls }>{ children }</Component>
        );
    }
};
