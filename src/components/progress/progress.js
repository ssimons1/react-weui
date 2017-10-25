import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import Icon from '../icon';

/**
 * @description progress bar
 * @example
 * Created by jf on 15/12/10.
 * "use strict";
 * import React from 'react';
 * import {Button, Progress} from '../../../build/packages';
 * import Page from '../../component/page';
 * export default class ProgressDemo extends React.Component {
 *     state = {
 *         value: 0,
 *         timer: null,
 *         isUploading: false
 *     };
 *     start() {
 *         if (this.state.isUploading) {
 *             return;
 *         }
 *         this.state.isUploading = true;
 *         this.upload();
 *     }
 *     pause() {
 *         this.setState({isUploading: false});
 *     }
 *     upload() {
 *         if (!this.state.isUploading) {
 *             return;
 *         }
 *         this.setState({value: ++this.state.value % 100});
 *         this.state.toastTimer = setTimeout(this.upload.bind(this), 20);
 *     }
 *     componentWillUnmount () {
 *         this.state.toastTimer && clearInterval(this.state.toastTimer);
 *     }
 *     render() {
 *         return (
 *             <Page className="progress" title="Progress" subTitle="进度条" spacing>
 *                 <Progress value={this.state.isUploading ? this.state.value : 0} onClick={this.pause.bind(this)} />
 *                 <br/>
 *                 <Progress value={this.state.isUploading ? this.state.value : 45} onClick={this.pause.bind(this)} />
 *                 <br/>
 *                 <Progress value={this.state.isUploading ? this.state.value : 75} onClick={this.pause.bind(this)} />
 *                 <br/>
 *                 <Button onClick={this.start.bind(this)} disabled={this.state.isUploading}>上传</Button>
 *             </Page>
 *         );
 *     }
 * };
 *
 */

const Progress = (props) => {

    const { className, showCancel, value, onClick, ...others } = props;
    const cls = classNames({
        'weui-progress': true,
        [className]: className
    });

    let pgWdith = value > 100 ? 100 : value < 0 ? 0 : value;

    return (
        <div className={cls} {...others}>
            <div className="weui-progress__bar">
                <div className="weui-progress__inner-bar" style={{width: `${pgWdith}%`}}></div>
            </div>

            {
                showCancel ?
                    <a href="javascript:;" className="weui-progress__opr" onClick={ e=> { if (onClick) onClick(e); } }>
                        <Icon value="cancel"/>
                    </a>
                : false
            }
        </div>
    );
};

Progress.propTypes = {
    /**
     * @property {PropTypes.number} value - value of the bar
     *
     */
    value: PropTypes.number,
    /**
     * @property {PropTypes.bool} showCancel - enable cancel button
     *
     */
    showCancel: PropTypes.bool
};

Progress.defaultProps = {
    value: 0,
    showCancel: true
};

export default Progress;
