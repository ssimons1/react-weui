import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import './toptips.less';

/**
 * @description Drop down message from top
 * @example
 * import React from 'react';
 * import {Button, Toast, Toptips} from '../../../build/packages';
 * import Page from '../../component/page';
 * class ToptipsDemo extends React.Component {
 *     state = {
 *         showWarn: false,
 *         showSuccess: false,
 *         showInfo: false,
 *         warnTimer: null,
 *         successTimer: null,
 *         infoTimer: null,
 *     };
 *     componentWillUnmount() {
 *         this.state.warnTimer && clearTimeout(this.state.warnTimer);
 *         this.state.successTimer && clearTimeout(this.state.successTimer);
 *         this.state.infoTimer && clearTimeout(this.state.infoTimer);
 *     }
 *     render() {
 *         return (
 *             <Page className="toptips" title="Toptips" subTitle="弹出式提示" spacing>
 *                 <Button onClick={this.showWarn.bind(this)} type="default">Warn Toptip</Button>
 *                 <Button onClick={this.showSuccess.bind(this)} type="default">Primary Toptip</Button>
 *                 <Button onClick={this.showInfo.bind(this)} type="default">Info Toptip</Button>
 *                 <Toptips type="warn" show={this.state.showWarn}> Oops, something is wrong! </Toptips>
 *                 <Toptips type="primary" show={this.state.showSuccess}> Success submited! </Toptips>
 *                 <Toptips type="info" show={this.state.showInfo}> Thanks for coming! </Toptips>
 *             </Page>
 *         );
 *     }
 *     showWarn() {
 *         this.setState({showWarn: true});
 *         this.state.warnTimer = setTimeout(()=> {
 *             this.setState({showWarn: false});
 *         }, 2000);
 *     }
 *     showSuccess() {
 *         this.setState({showSuccess: true});
 *         this.state.successTimer = setTimeout(()=> {
 *             this.setState({showSuccess: false});
 *         }, 2000);
 *     }
 *     showInfo() {
 *         this.setState({showInfo: true});
 *         this.state.infoTimer = setTimeout(()=> {
 *             this.setState({showInfo: false});
 *         }, 2000);
 *     }
 * };
 * export default ToptipsDemo
 *
 */

const Toptips = (props) => {
    const {className, type, children, show, ...others} = props;
    const cls = classNames({
        'weui-toptips': true,
        [`weui-toptips_${type}`]: true,
        [className]: className
    });

    return (
        <div className={cls} {...others} style={{display: show ? 'block' : 'none'}}>
            {children}
        </div>
    );
};

Toptips.propTypes = {
    /**
     * @property {PropTypes.bool} show - display tips
     *
     */
    show: PropTypes.bool,
    /**
     * @property {PropTypes.string} type - type: `default`, `warn`, `info`, `primary`
     */
    type: PropTypes.string
};

Toptips.defaultProps = {
    show: false,
    type: 'default'
};

export default Toptips;
