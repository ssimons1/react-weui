import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import PullToRefresh from '../ptr/index';
import InfiniteLoader from '../infiniteloader/index';
import './page.less';
/**
 * @description A Component for a standard page
 * @example
 * import React from 'react';
 * import { Article, Page } from '../../../build/packages';
 * import srcArticle from '../article/pic_article.png';
 * const PageDemo = (props) => (
 *     <Page transition={true} infiniteLoader={true} ptr={false}>
 *         <Article>
 *             <h1>Page Demo</h1>
 *             <section>
 *                 <h2 className="title">H2 Title</h2>
 *                 <section>
 *                     <h3>H3 Heading</h3>
 *                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
 *                         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
 *                         quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
 *                         consequat. Duis aute</p>
 *                     <p>
 *                         <img src={srcArticle} alt/>
 *                         <img src={srcArticle} alt/>
 *                     </p>
 *                 </section>
 *                 <section>
 *                     <h3>H3 Heading</h3>
 *                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
 *                         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
 *                         cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
 *                         proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
 *                 </section>
 *             </section>
 *         </Article>
 *     </Page>
 * );
 * export default PageDemo;
 *
 */

class Page extends Component {
    static propTypes = {
        /**
         * @property {PropTypes.bool} ptr - indicate to use ptr
         *
         */
        ptr: PropTypes.bool,
        /**
         * @property {PropTypes.func} ptrOnRefresh - function to call when ptr refresh, pass function resolve to finish loading
         *
         */
        ptrOnRefresh: PropTypes.func,
        /**
         * @property {PropTypes.bool} infiniteLoader - indicate to use infiniteloader
         *
         */
        infiniteLoader: PropTypes.bool,
        /**
         * @property {PropTypes.func} onLoadMore - callback when it's requesting for more content, pass resolve function and finish function
         *
         */
        onLoadMore: PropTypes.func,
        /**
         * @property {PropTypes.bool} transition - enable page transition
         *
         */
        transition: PropTypes.bool,
    };

    static defaultProps = {
        ptr: true,
        ptrOnRefresh: resolve => {
            setTimeout(()=>{
                resolve();
            }, 1000);
        },
        infiniteLoader: true,
        onLoadMore: (resolve, finish) => {
            //mock request
            setTimeout( ()=> {
                finish();
            }, 1000);
        },
        transition: true
    };

    constructor(props){
        super(props);

        this.state = {
            ptrRefreshing: false,
            contentScrollOnTop: true,
        };

        this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.infiniteLoader){
            this.setState({ contentScrollOnTop: true});
        } else {
            this.setState({ contentScrollOnTop: false});
        }
    }

    componentWillUnmount() {
        //console.log('unmounting page');
    }

    handleRefresh(resolve){
        this.setState({
            ptrRefreshing: true
        }, ()=>{
            this.props.ptrOnRefresh(()=>{
                this.setState({
                    ptrRefreshing: false
                });
                resolve();
            });
        });
    }

    handleContentScroll(e){
        if (e.target.scrollTop <= 0){
            this.setState({ contentScrollOnTop: true});
        } else {
            this.setState({ contentScrollOnTop: false});
        }
    }

    renderContent(children, ptr, infiniteLoader){
        if (!infiniteLoader && !ptr) return children;

        const ContentWithInfiniteLoader = <InfiniteLoader
            height="100%"
            disable={this.state.ptrRefreshing}
            onScroll={ e=> this.handleContentScroll(e) }
            onLoadMore={ this.props.onLoadMore }
        >
            { children }
        </InfiniteLoader>;
        if (!ptr && infiniteLoader ) return ContentWithInfiniteLoader;
        if ( ptr && !infiniteLoader) return (
            <PullToRefresh
                onRefresh={this.handleRefresh}
                disable={!this.state.contentScrollOnTop}
            >
                {children}
            </PullToRefresh>
        );

        return (
            <PullToRefresh
                onRefresh={this.handleRefresh}
                disable={!this.state.contentScrollOnTop}
            >
                {ContentWithInfiniteLoader}
            </PullToRefresh>
        );

    }

    render(){
        const { children, style, className, infiniteLoader, transition, ptr } = this.props;
        const cls = classNames('weui-page', className);

        return (
            <div
                className={cls}
                style={Object.assign({}, {animationName: transition ? 'pageInRight' : ''}, style)}>
                { this.renderContent(children, ptr, infiniteLoader) }
            </div>
        );
    }
}

export default Page;
