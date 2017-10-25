import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import Mask from '../mask/index';

/**
 * @description Modals provide feedback to user
 * @example
 * import React from 'react';
 * import { Button, Dialog } from '../../../build/packages';
 * import Page from '../../component/page';
 * export default class DialogDemo extends React.Component {
 *     state = {
 *         showIOS1: false,
 *         showIOS2: false,
 *         showAndroid1: false,
 *         showAndroid2: false,
 *         style1: {
 *             buttons: [
 *                 {
 *                     label: 'Ok',
 *                     onClick: this.hideDialog.bind(this)
 *                 }
 *             ]
 *         },
 *         style2: {
 *             title: 'Heading',
 *             buttons: [
 *                 {
 *                     type: 'default',
 *                     label: 'Cancel',
 *                     onClick: this.hideDialog.bind(this)
 *                 },
 *                 {
 *                     type: 'primary',
 *                     label: 'Ok',
 *                     onClick: this.hideDialog.bind(this)
 *                 }
 *             ]
 *         }
 *     };
 *     hideDialog() {
 *         this.setState({
 *             showIOS1: false,
 *             showIOS2: false,
 *             showAndroid1: false,
 *             showAndroid2: false,
 *         });
 *     }
 *     render() {
 *         return (
 *             <Page className="dialog" title="Dialog" subTitle="对话框" spacing>
 *                 <Button type="default" onClick={ e=> this.setState({ showIOS1: true}) } >iOS Style1</Button>
 *                 <Button type="default" onClick={ e=> this.setState({ showIOS2: true}) }>iOS Style2</Button>
 *                 <Button type="default" onClick={ e=> this.setState({ showAndroid1: true}) } >Android Style1</Button>
 *                 <Button type="default" onClick={ e=> this.setState({ showAndroid2: true}) }>Android Style2</Button>
 *                 <Dialog type="ios" title={this.state.style1.title} buttons={this.state.style1.buttons} show={this.state.showIOS1}>
 *                     This is iOS Style 1
 *                 </Dialog>
 *                 <Dialog type="ios" title={this.state.style2.title} buttons={this.state.style2.buttons} show={this.state.showIOS2}>
 *                     This is iOS Style 2
 *                 </Dialog>
 *                 <Dialog type="android" title={this.state.style1.title} buttons={this.state.style1.buttons} show={this.state.showAndroid1}>
 *                     This is Android Style 1
 *                 </Dialog>
 *                 <Dialog type="android" title={this.state.style2.title} buttons={this.state.style2.buttons} show={this.state.showAndroid2}>
 *                     This is Android Style 2
 *                 </Dialog>
 *             </Page>
 *         );
 *     }
 * };
 *
 */

class Dialog extends Component {
    static propTypes = {
        /**
         * @property {PropTypes.array} buttons - Object Arrays of buttons, `label` property is require
         *
         */
        buttons: PropTypes.array,
        /**
         * @property {PropTypes.bool} show - to display the dialog
         *
         */
        show: PropTypes.bool,
        /**
         * @property {PropTypes.string} title - Title of dialog
         *
         */
        title: PropTypes.string,
        /**
         * @property {PropTypes.string} type - Specify display style: ios/android, default is ios when autoDetect not on
         *
         */
        type: PropTypes.string,
    };

    static defaultProps = {
        buttons: [],
        show: false,
        title: '',
        type: '',
    };

    constructor(props){
        super(props);

        this.state = {
            isAndroid: ''
        };
    }

    renderButtons() {
        return this.props.buttons.map((action, idx) => {
            const {type, label, ...others} = action;
            const className = classNames({
                'weui-dialog__btn': true,
                'weui-dialog__btn_default': type === 'default',
                'weui-dialog__btn_primary': type === 'primary'
            });

            return (
                <a key={idx} href="javascript:;" {...others} className={className}>{label}</a>
            );
        });
    }

    render() {
        const {title, show, className, children, buttons, type, autoDectect, ...others} = this.props;
        const styleType = type ? type : 'ios';
        const cls = classNames('weui-dialog', {
            'weui-skin_android': styleType === 'android',
            [className]: className
        });

        return (
            <div style={{display: show ? 'block' : 'none'}}>
                <Mask/>
                <div className={cls} {...others}>
                    { title ?
                    <div className="weui-dialog__hd">
                        <strong className="weui-dialog__title">{title}</strong>
                    </div> : false }
                    <div className="weui-dialog__bd">
                        {children}
                    </div>
                    <div className="weui-dialog__ft">
                        {this.renderButtons()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dialog;
