import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import {Button, ButtonArea} from '../button/index';
import { Footer, FooterLinks, FooterLink } from '../footer';
import Icon from '../icon/index';
import deprecationWarning from '../../utils/deprecationWarning';

/**
 * @description A full notification page to indicate results
 * @example
 * import React from 'react';
 * import { Msg, Footer, FooterLinks, FooterLink, FooterText } from '../../../build/packages';
 * import Page from '../../component/page';
 * const SuccessFooter = ()=>(
 *     <Footer>
 *         <FooterLinks>
 *             <FooterLink href="#">Footer Link</FooterLink>
 *         </FooterLinks>
 *         <FooterText>
 *             Copyright © 2008-2016 weui.io
 *         </FooterText>
 *     </Footer>
 * );
 * const SuccessMsg = (props) => {
 *     return (
 *     <Page className="msg_success">
 *         <Msg
 *             type="success"
 *             title="Action Success"
 *             description="We have received your feedback"
 *             buttons={[{
 *                 type: 'primary',
 *                 label: 'Ok',
 *                 onClick: props.history ? props.history.goBack : false
 *             }, {
 *                 type: 'default',
 *                 label: 'Cancel',
 *                 onClick: props.history ? props.history.goBack : false
 *             }]}
 *             footer={SuccessFooter}
 *         />
 *     </Page>
 *     )
 * }
 * export default SuccessMsg;
 *
 */

class Msg extends Component {
    static propTypes = {
        /**
         * @property {PropTypes.string} type - Icon type
         *
         */
        type: PropTypes.string,
        /**
         * @property {PropTypes.array} buttons - Object array of Buttons, require at least `label` property
         *
         */
        buttons: PropTypes.array,
        /**
         * @property {PropTypes.string} title - Page Title
         *
         */
        title: PropTypes.string,
        /**
         * @property {PropTypes.string} description - Page Description
         *
         */
        description: PropTypes.string,
        /**
         * @property {PropTypes.string} extraHref - deprecated property from 0.4.x
         *
         */
        extraHref: PropTypes.string,
        /**
         * @property {PropTypes.string} extraText - deprecated property from 0.4.x
         *
         */
        extraText: PropTypes.string,
        /**
         * @property {PropTypes.any} footer - Footer Element of Page
         *
         */
        footer: PropTypes.any
    };

    static defaultProps = {
        type: 'success',
        buttons: []
    };

    _renderButtons() {

        return this.props.buttons.map((button, idx) => {
            const {type, label, ...others} = button;
            return (
                <Button key={idx} {...others} type={type}>{label}</Button>
            );
        });
    }

    render() {
        const { children, className, type, title, description, extraHref, extraText, footer, buttons, ...others } = this.props;
        const cls = classNames('weui-msg', {
            [className]: className
        });

        let elFooter = footer ? footer : ()=>false;

        if (!elFooter() && (extraHref || extraText) ){
            deprecationWarning('Msg extraHref/extraText', 'Msg footer');

            elFooter = () => (
                <Footer>
                    <FooterLinks>
                        <FooterLink href={extraHref}>{extraText}</FooterLink>
                    </FooterLinks>
                </Footer>
            );
        }

        return (
            <div className={cls} {...others}>
                <div className="weui-msg__icon-area">
                    <Icon value={type} size='large' />
                </div>
                <div className="weui-msg__text-area">
                    { title ? <h2 className="weui-msg__title">{title}</h2> : false }
                    { description ? <p className="weui-msg__desc">{description}</p> : false }
                    { children }
                </div>
                <div className="weui-msg__opr-area">
                    <ButtonArea>
                        {this._renderButtons()}
                    </ButtonArea>
                </div>
                <div className="weui-msg__extra-area">
                    {elFooter()}
                </div>
            </div>
        );
    }
}

export default Msg;
