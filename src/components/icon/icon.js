import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import deprecationWarning from '../../utils/deprecationWarning';

const deprecateValue = {
    'safe_success': 'safe-success',
    'safe_warn': 'safe-warn',
    'success_circle': 'success-circle',
    'success_no_circle': 'success-no-circle',
    'waiting_circle': 'waiting-circle',
    'info_circle': 'info-circle'
};

/**
 * @description WeUI Icons
 * @example
 * import React from 'react';
 * import {Icon} from '../../../build/packages';
 * import Page from '../../component/page';
 * import './icons.less';
 * const IconBox = (props) => (
 *     <div className="icon-box">
 *         {props.icon}
 *         <div className="icon-box__ctn">
 *             <h3 className="icon-box__title">{props.title}</h3>
 *             <p className="icon-box__desc">{props.desc}</p>
 *         </div>
 *     </div>
 * )
 * export default class IconDemo extends React.Component {
 *     render() {
 *         return (
 *             <Page className="icons" title="Icons" subTitle="图标"spacing>
 *                 <IconBox
 *                     icon={<Icon size="large" value="success" />}
 *                     title="Well done!"
 *                     desc="You successfully read this important alert message."
 *                 />
 *                 <IconBox
 *                     icon={<Icon size="large" value="info" />}
 *                     title="Heads up!"
 *                     desc="This alert needs your attention, but it's not super important."
 *                 />
 *                 <IconBox
 *                     icon={<Icon size="large" value="warn" primary/>}
 *                     title="Attention!"
 *                     desc="This is your default warning with the primary property"
 *                 />
 *                 <IconBox
 *                     icon={<Icon size="large" value="warn"/>}
 *                     title="Attention!"
 *                     desc="This is your strong warning without the primary property"
 *                 />
 *                 <IconBox
 *                     icon={<Icon size="large" value="waiting"/>}
 *                     title="Hold on!"
 *                     desc="We are working hard to bring the best ui experience"
 *                 />
 *                 <Icon size="large" value="safe-success" />
 *                 <Icon size="large" value="safe-warn" />
 *                 <div className="icon_sp_area">
 *                     <Icon value="success" />
 *                     <Icon value="success-circle" />
 *                     <Icon value="success-no-circle" />
 *                     <Icon value="info" />
 *                     <Icon value="waiting" />
 *                     <Icon value="waiting-circle" />
 *                     <Icon value="circle" />
 *                     <Icon value="warn" />
 *                     <Icon value="download" />
 *                     <Icon value="info-circle" />
 *                     <Icon value="cancel" />
 *                     <Icon value="clear" />
 *                     <Icon value="search" />
 *                 </div>
 *             </Page>
 *         );
 *     }
 * };
 *
 */

class Icon extends React.Component {
    static propTypes = {
        /**
         * @property {PropTypes.string} value - types of [weui icons](https://github.com/weui/weui/wiki/Icon)
         *
         */
        value: PropTypes.string,
        /**
         * @property {PropTypes.string} size - size of icon, options: small/large
         *
         */
        size: PropTypes.string
    };

    static defaultProps = {
        value: 'success',
        size: 'small'
    };

    render() {
        const {value, size, className, primary, ...others} = this.props;

        if (Object.keys(deprecateValue).indexOf(value) !== -1){
            deprecationWarning(`Icon ${value}`, `Icon ${deprecateValue[value]}`);
        }

        const cls = classNames({
            ['weui-icon-' + value]: value !== 'loading',
            'weui-icon_msg': size === 'large' && !primary,
            'weui-icon_msg-primary': size === 'large' && primary,
            'weui-loading': value === 'loading',
            [className]: className
        });

        return (
            <i {...others} className={cls}/>
        );
    }
}

export default Icon;
