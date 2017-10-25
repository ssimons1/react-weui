import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import Mask from '../mask/index';
import Icon from '../icon/index';

/**
 * @description pop out indicator to inform users
 * @example
 * import React from 'react';
 * import {Button, Toast} from '../../../build/packages';
 * import Page from '../../component/page';
 * export default class ToastDemo extends React.Component {
 *     state = {
 *         showToast: false,
 *         showLoading: false,
 *         toastTimer: null,
 *         loadingTimer: null,
 *     };
 *     componentWillUnmount() {
 *         this.state.toastTimer && clearTimeout(this.state.toastTimer);
 *         this.state.loadingTimer && clearTimeout(this.state.loadingTimer);
 *     }
 *     render() {
 *         return (
 *             <Page className="toast" title="Toast" subTitle="弹出式提示" spacing>
 *                 <Button onClick={this.showToast.bind(this)} type="default">Success Toast</Button>
 *                 <Button onClick={this.showLoading.bind(this)} type="default">Loading Toast</Button>
 *                 <Toast icon="success-no-circle" show={this.state.showToast}>Done</Toast>
 *                 <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
 *             </Page>
 *         );
 *     }
 *     showToast() {
 *         this.setState({showToast: true});
 *         this.state.toastTimer = setTimeout(()=> {
 *             this.setState({showToast: false});
 *         }, 2000);
 *     }
 *     showLoading() {
 *         this.setState({showLoading: true});
 *         this.state.loadingTimer = setTimeout(()=> {
 *             this.setState({showLoading: false});
 *         }, 2000);
 *     }
 * };
 *
 */
class Toast extends Component {
    static propTypes = {
        /**
         * @property {PropTypes.string} icon - Icon Value
         *
         */
        icon: PropTypes.string,
        /**
         * @property {PropTypes.string} iconSize - Icon Size
         *
         */
        iconSize: PropTypes.string,
        /**
         * @property {PropTypes.bool} show - display toast
         *
         */
        show: PropTypes.bool
    };

    static defaultProps = {
        icon: 'toast',
        show: false,
    };

    render() {
        const {className, icon, show, children, iconSize, ...others} = this.props;
        const cls = classNames('weui-toast', {
            [className]: className
        });
        return (
            <div style={{display: show ? 'block' : 'none'}}>
                <Mask transparent={true}/>
                <div className={cls} {...others}>
                    <Icon value={icon} size={iconSize} className="weui-icon_toast"/>
                    <p className="weui-toast_content">{children}</p>
                </div>
            </div>
        );
    }
}

export default Toast;
