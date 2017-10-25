import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from '../../utils/classnames';
import LoadMore from '../loadmore';

import './infiniteloader.less';

/**
 * @description A Container trigger loading once it reach certain scrolltop
 * @example
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 * import {
 *     InfiniteLoader,
 *     Cells,
 *     CellsTitle,
 *     Cell,
 *     CellBody,
 *     CellFooter
 * } from '../../../build/packages';
 * import Page from '../../component/page';
 * class InfiniteDemo extends React.Component {
 *     constructor(props){
 *         super(props)
 *         this.state = {
 *             items: [...Array(20).keys()]
 *         }
 *     }
 *     render(){
 *         return (
 *             <InfiniteLoader
 *                 onLoadMore={ (resolve, finish) => {
 *                     //mock request
 *                     setTimeout( ()=> {
 *                         if(this.state.items.length > 22){
 *                             finish()
 *                         }else{
 *                             this.setState({
 *                                 items: this.state.items.concat([this.state.items.length])
 *                             }, ()=> resolve())
 *                         }
 *                     }, 1000)
 *                 }}
 *             >
 *             <Page className="infinite" title="Infinite Loader" subTitle="滚动加载" >
 *                     <CellsTitle>List with 22 Max</CellsTitle>
 *                     <Cells>
 *                     {
 *                         this.state.items.map( (item, i) => {
 *                             return (
 *                                 <Cell href="javascript:;" key={i} access>
 *                                     <CellBody>
 *                                         {item}
 *                                     </CellBody>
 *                                     <CellFooter/>
 *                                 </Cell>
 *                             )
 *                         })
 *                     }
 *                     </Cells>
 *             </Page>
 *             </InfiniteLoader>
 *         )
 *     }
 * }
 * export default InfiniteDemo;
 *
 */

class InfiniteLoader extends Component{

     static propTypes = {
        /**
         * @property {PropTypes.string} height - height for the container, use string like '10px', default for '100vh'
         *
         */
        height: PropTypes.string,
        /**
         * @property {PropTypes.object} loaderDefaultIcon - element(icon) for default loader when there is no more content
         *
         */
        loaderDefaultIcon: PropTypes.object,
        /**
         * @property {PropTypes.object} loaderLoadingIcon - element(icon) for loading loader
         *
         */
        loaderLoadingIcon: PropTypes.object,
        /**
         * @property {PropTypes.number} triggerPercent - percentage of scrollTop to trigger loading
         *
         */
        triggerPercent: PropTypes.number,
        /**
         * @property {PropTypes.func} onScroll - callback when user scroll the content, pass event
         *
         */
        onScroll: PropTypes.func,
        /**
         * @property {PropTypes.func} onScrollEnd - callback when user did not scroll for 150ms
         *
         */
        onScrollEnd: PropTypes.func,
        /**
         * @property {PropTypes.func} onLoadMore - callback when it's requesting for more content, pass resolve function and finish function
         *
         */
        onLoadMore: PropTypes.func,
        /**
         * @property {PropTypes.bool} disable - disable the loader
         *
         */
        disable: PropTypes.bool,
    };

    static defaultProps = {
        height: '100vh',
        triggerPercent: 75,
        loaderLoadingIcon: <LoadMore loading> Loading... </LoadMore>,
        loaderDefaultIcon: <LoadMore showLine> No Data</LoadMore>,
        disable: false
    }

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            finish: false,
            scrollTimer: null
        };

        this.scrollHandle = this.scrollHandle.bind(this);
        this.resolveLoading = this.resolveLoading.bind(this);
        this.finish = this.finish.bind(this);
    }

    finish(){
        this.setState({
            loading: false,
            finish: true
        });
    }

    resolveLoading(){
        this.setState({
            loading: false,
            finish: false
        });
    }

    scrollHandle(e){
        if (this.props.onScroll) this.props.onScroll(e);
        if (this.state.loading || this.state.finish || this.props.disable || e.target.scrollTop === 0) return;

        //setup for scrollend event
        clearTimeout(this.state.scrollTimer);
        this.setState({ scrollTimer: setTimeout( ()=>{
            if (this.props.onScrollEnd) this.props.onScrollEnd();
        }, 150) });

        let target = e.target;
        let scrollPercent = Math.floor(( (target.scrollTop + target.clientHeight) / target.scrollHeight) * 100);

        if (scrollPercent > this.props.triggerPercent) {
            this.setState({
                loading: true
            });

            this.props.onLoadMore(this.resolveLoading, this.finish);
        }
    }

    render(){

        const { children, className, height, triggerPercent, disable, loaderLoadingIcon, loaderDefaultIcon, onScrollEnd, onScroll, onLoadMore, ...domProps } = this.props;
        const clx = classNames( 'react-weui-infiniteloader', className );

        let containerStyle = {
            height,
        };

        let contentStyle = {
            overflow: disable ? 'hidden' : 'scroll'
        };

        let loaderStyle = {
            display: this.state.loading || this.state.finish ? 'block' : 'none'
        };

        return (
            <div
                className={clx}
                style={containerStyle}
                onScroll={this.scrollHandle}
                {...domProps}
            >
                <div
                    className="react-weui-infiniteloader__content"
                    style={contentStyle}
                    ref="container"
                >
                    { children }
                    <div style={loaderStyle}>
                        { this.state.finish ? loaderDefaultIcon : this.state.loading ? loaderLoadingIcon : false }
                    </div>
                </div>
            </div>
        );
    }
}

export default InfiniteLoader;
