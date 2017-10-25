import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';

import TabBody from './tab_body';
import TabBodyItem from './tab_body_item';
import NavBar from './navbar';
import NavBarItem from './navbar_item';
import TabBar from './tabbar';
import TabBarItem from './tabbar_item';
import TabBarIcon from './tabbar_icon';
import TabBarLabel from './tabbar_label';

/**
 * @description Weui Tab component, can be auto mount items or mannually display items
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
 *
 */

export default class Tab extends React.Component {
    static propTypes = {
        /**
         * @property {PropTypes.string} type - layout of the tab, auto mount components when set to `navbar` or `tabbar`
         *
         */
        type: PropTypes.string,
        /**
         * @property {PropTypes.number} defaultIndex - default select index
         *
         */
        defaultIndex: PropTypes.number,
        /**
         * @property {PropTypes.func} onChange - default select index
         *
         */
        onChange: PropTypes.func
    };

    static defaultProps = {
      type: 'normal',
      defaultIndex: 0
    };

    state={
        index: this.props.defaultIndex
    };

    handleHeaderClick(idx) {
        this.setState({index: idx});
        if (this.props.onChange) this.props.onChange(idx);
    }

    parseChild(childrenInput) {
        const ChildHeaders = [];
        const ChildContents = [];

        React.Children.map(childrenInput, child => {
            if (!child) return;
            const {children, type, ...others} = child.props;
            if (child.type === TabBarItem || child.type === NavBarItem){
              ChildHeaders.push(child);
              if (children) ChildContents.push(<TabBodyItem children={children}/>);
            }
            else if (child.type === TabBodyItem){
              ChildContents.push(child);
            }
        });

        return {ChildHeaders, ChildContents};
    }

    renderBar(type, children, cls) {
        const {ChildHeaders, ChildContents} = this.parseChild(children);

        let _headers = ChildHeaders.map((item, idx)=>{
            return React.cloneElement(item, {
                key: idx,
                active: this.state.index === idx,
                onClick: this.handleHeaderClick.bind(this, idx, item)
            });
        });

        let _contents = ChildContents.map((item, idx)=>{
            return React.cloneElement(item, {
                key: idx,
                active: this.state.index === idx,
                tabIndex: idx
            });
        });

        if (type === 'tabbar'){
            return (
                <div className={cls}>
                    <TabBody>
                        {_contents}
                    </TabBody>
                    <TabBar>
                        {_headers}
                    </TabBar>
                </div>
            );
        }
        else if (type === 'navbar'){
            return (
                <div className={cls}>
                    <NavBar>
                        {_headers}
                    </NavBar>
                    <TabBody>
                        {_contents}
                    </TabBody>
                </div>
            );
        }
        else {
            return false;
        }

    }

    render() {
        const {children, className, type, ...others} = this.props;
        const divProps = Object.assign({}, others);
        delete divProps.defaultIndex;

        const cls = classNames({
            'weui-tab': true
        }, className);

        if (type === 'normal') {
            return (
                <div className={cls} {...divProps}>
                    {children}
                </div>
            );
        }
        else {
            return this.renderBar(type, children, cls);
        }
    }
}
