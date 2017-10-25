import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';

/**
 * @description Content wrapper for each Tab Item
 * @example
 * import React from 'react';
 * import {
 *     Tab,
 *     TabBody,
 *     NavBar,
 *     NavBarItem,
 *     Article
 * } from '../../../build/packages';
 * export default class NavBarDemo extends React.Component {
 *     state={
 *         tab:0
 *     };
 *     render() {
 *         return (
 *             <Tab>
 *                 <NavBar>
 *                     <NavBarItem active={this.state.tab == 0} onClick={e=>this.setState({tab:0})}>Nav1</NavBarItem>
 *                     <NavBarItem active={this.state.tab == 1} onClick={e=>this.setState({tab:1})}>Nav2</NavBarItem>
 *                     <NavBarItem active={this.state.tab == 2} onClick={e=>this.setState({tab:2})}>Nav3</NavBarItem>
 *                 </NavBar>
 *                 <TabBody>
 *                     <Article style={{display: this.state.tab == 0 ? null : 'none'}}>
 *                         <h1>Page 1</h1>
 *                         <section>
 *                             <h2 className="title">Heading</h2>
 *                             <section>
 *                                 <h3>1.1 Title</h3>
 *                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
 *                                     tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
 *                                     quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
 *                                     consequat. Duis aute</p>
 *                             </section>
 *                         </section>
 *                     </Article>
 *                     <Article style={{display: this.state.tab == 1 ? null : 'none'}}>
 *                         <h1>Page 2</h1>
 *                         <section>
 *                             <h2 className="title">Heading</h2>
 *                             <section>
 *                                 <h3>2.1 Title</h3>
 *                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
 *                                     tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
 *                                     quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
 *                                     consequat. Duis aute</p>
 *                             </section>
 *                             <section>
 *                                 <h3>2.2 Title</h3>
 *                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
 *                                     tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
 *                                     cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
 *                                     proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
 *                             </section>
 *                         </section>
 *                     </Article>
 *                     <Article style={{display: this.state.tab == 2 ? null : 'none'}}>
 *                         <h1>Page 3</h1>
 *                         <section>
 *                             <h2 className="title">Heading</h2>
 *                             <section>
 *                                 <h3>3.1 Title</h3>
 *                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
 *                                     tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
 *                                     quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
 *                                     consequat. Duis aute</p>
 *                             </section>
 *                             <section>
 *                                 <h3>3.2 Title</h3>
 *                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
 *                                     tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
 *                                     cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
 *                                     proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
 *                             </section>
 *                         </section>
 *                     </Article>
 *                 </TabBody>
 *             </Tab>
 *         );
 *     }
 * };
 */

export default class TabBodyItem extends React.Component {
    static propTypes = {
        /**
         * @property {PropTypes.bool} active - display this component
         *
         */
        active: PropTypes.bool
    };

    static defaultProps = {
      active: false
    };

    render() {

        const {children, className, active, ...others} = this.props;
        const cls = classNames({
           'weui-tab__bd-item': true
        }, className);

        return (
            <div className={cls} style={{display: active ? 'block' : 'none'}} {...others}>
                {children}
            </div>
        );
    }
}
