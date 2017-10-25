import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import Mask from '../mask/index';
import './actionsheet.less';

/**
 * @description Used to display a collection of actions that contain a set of interactivity, including descriptions, links, and so on. Popup from the bottom, generally used to respond to user clicks on the page.
 * @example
 * Visibility
 * To use ActionSheet, you want to first setup a state variable to toggle it's visibility for show property and a callback function onRequestClose property when users wants to hide the ActionSheet.
 * //inside your component state
 * state = {
 *     show: false
 * }
 * //button to toggle the ActionSheet
 * <Button
 *     onClick={ e => this.setState({ show: true }) }
 * />
 * //inside the render function
 * <ActionSheet
 *     show={ this.state.show }
 *     onRequestClose={
 *         //function to hide ActionSheet
 *         e => this.setState({ show: false })
 *     }
 * />
 */

class ActionSheet extends Component {
    static propTypes = {
        /**
         * @property {PropTypes.array} menus - Array of Objects for menus, `label` property is Required
         *
         */
        menus: PropTypes.array,
        /**
         * @property {PropTypes.array} actions - Array of Objects for actions, `label` property is Required
         *
         */
        actions: PropTypes.array,
        /**
         * @property {PropTypes.bool} show -To display ActionSheet
         *
         */
        show: PropTypes.bool,
        /**
         * @property {PropTypes.func} onRequestClose -Function triggers when user click on the mask
         *
         */
        onRequestClose: PropTypes.func,
        /**
         * @property {PropTypes.string} type -style: ios/android
         */
        type: PropTypes.string,
    };

    static defaultProps = {
        type: '',
        menus: [],
        actions: [],
        show: false,
    };

    constructor(props) {
        super(props);


        this.handleMaskClick = this.handleMaskClick.bind(this);
    }

    renderMenuItem() {
        return this.props.menus.map((menu, idx) => {
            const {label, className, ...others} = menu;
            const cls = classNames({
                'weui-actionsheet__cell': true,
                [className]: className
            });

            return (
                <div key={idx} {...others} className={cls}>{label}</div>
            );
        });
    }

    renderActions() {
        return this.props.actions.map((action, idx) => {
            const {label, className, ...others} = action;
            const cls = classNames({
                'weui-actionsheet__cell': true,
                [className]: className
            });

            return (
                <div key={idx} {...others} className={cls}>{label}</div>
            );
        });
    }

    handleMaskClick(e){
        if (this.props.onRequestClose) this.props.onRequestClose(e);
    }

    render() {
        const {show, type, onRequestClose, menus, actions, ...others} = this.props;
        const cls = classNames({
            'weui-actionsheet': true,
            'weui-actionsheet_toggle': show
        });

        let styleType = type ? type : 'ios';

        return (
            <div
                className={styleType === 'android' ? 'weui-skin_android' : ''}
            >
                    <Mask style={{display: show ? 'block' : 'none'}} onClick={this.handleMaskClick} />
                    <div className={cls} {...others} >
                        <div className="weui-actionsheet__menu">
                            {this.renderMenuItem()}
                        </div>
                        <div className="weui-actionsheet__action">
                            {this.renderActions()}
                        </div>
                    </div>
            </div>
        );
    }
};

export default ActionSheet;
