import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import Icon from '../icon';

/**
 * @description weui search component
 * @example
 * import React from 'react';
 * import Page from '../../component/page';
 * import SampleData from './nameDB';
 * import {
 *     //main component
 *     SearchBar,
 *     //for display data
 *     Panel,
 *     PanelHeader,
 *     PanelBody,
 *     PanelFooter,
 *     MediaBox,
 *     MediaBoxHeader,
 *     MediaBoxBody,
 *     MediaBoxTitle,
 *     MediaBoxDescription,
 *     Cell,
 *     CellBody,
 *     CellFooter
 * } from '../../../build/packages';
 * const appMsgIcon = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==" />
 * const CellMore = () => (
 *     <Cell access link>
 *         <CellBody>More</CellBody>
 *         <CellFooter />
 *     </Cell>
 * )
 * export default class SearchBarDemo extends React.Component {
 *     state={
 *         searchText: 'a',
 *         results: []
 *     };
 *     handleChange(text, e){
 *         let keywords = [text];
 *         let results = SampleData.filter(/./.test.bind(new RegExp(keywords.join('|'),'i')));
 *         if(results.length > 3) results = results.slice(0,3);
 *         this.setState({
 *             results,
 *             searchText:text,
 *         });
 *     }
 *     render() {
 *         return (
 *             <Page className="searchbar" title="SearchBar" subTitle="搜索栏">
 *                 <SearchBar
 *                     onChange={this.handleChange.bind(this)}
 *                     defaultValue={this.state.searchText}
 *                     placeholder="Female Name Search"
 *                     lang={{
 *                         cancel: 'Cancel'
 *                     }}
 *                 />
 *                 <Panel style={{display: this.state.searchText ? null: 'none', marginTop: 0}}>
 *                     <PanelHeader>
 *                         Female Name Search
 *                     </PanelHeader>
 *                     <PanelBody>
 *                         {
 *                             this.state.results.length > 0 ?
 *                                 this.state.results.map((item,i)=>{
 *                                     return (
 *                                         <MediaBox key={i} type="appmsg" href="javascript:void(0);">
 *                                             <MediaBoxHeader>{appMsgIcon}</MediaBoxHeader>
 *                                             <MediaBoxBody>
 *                                                 <MediaBoxTitle>{item}</MediaBoxTitle>
 *                                                 <MediaBoxDescription>
 *                                                     You may like this name.
 *                                                 </MediaBoxDescription>
 *                                             </MediaBoxBody>
 *                                         </MediaBox>
 *                                     )
 *                                 })
 *                                 : <MediaBox>Can't find any！</MediaBox>
 *                         }
 *                     </PanelBody>
 *                     <PanelFooter href="javascript:void(0);">
 *                         <CellMore />
 *                     </PanelFooter>
 *                 </Panel>
 *             </Page>
 *         );
 *     }
 * };
 *
 */

class SearchBar extends React.Component {
    static propTypes = {
        /**
         * @property {PropTypes.string} defaultValue - default value for the searchbar if any
         *
         */
        defaultValue: PropTypes.string,
        /**
         * @property {PropTypes.string} placeHolder - default place holder text
         *
         */
        placeholder: PropTypes.string,
        /**
         * @property {PropTypes.string} searchName - name of the input component
         *
         */
        searchName: PropTypes.string,
        /**
         * @property {PropTypes.func} onChange - trigger when text change on input pass `text` property
         *
         */
        onChange: PropTypes.func,
        /**
         * @property {PropTypes.func} onClear - trigger when user click clear icon
         *
         */
        onClear: PropTypes.func,
        /**
         * @property {PropTypes.func} onCancel - trigger when user click cancel button
         *
         */
        onCancel: PropTypes.func,
        /**
         * @property {PropTypes.func} onSubmit - trigger when user submit (enter action)
         *
         */
        onSubmit: PropTypes.func,
        /**
         * @property {PropTypes.object} lang - language object consists of `cancel` property
         *
         */
        lang: PropTypes.object
    };

    static defaultProps = {
        placeholder: '搜索',
        searchName: 'q',
        onChange: undefined,
        onClear: undefined,
        onCancel: undefined,
        onSubmit: undefined,
        lang: { cancel: '取消' },
        autocomplete: 'off'
    };

    constructor(props){
        super(props);

        this.state = {
            focus: this.props.defaultValue ? true : false,
            clearing: false,
            text: this.props.defaultValue ? this.props.defaultValue : ''
        };

        if (this.props.defaultValue !== ''){
            if (this.props.onChange) this.props.onChange(this.state.text);
        }
    }

    changeHandle(e) {
        let text = e.target.value;
        if (this.props.onChange) this.props.onChange(text, e);
        this.setState({text});
    }

    cancelHandle(e) {
        this.setState({
            focus: false,
            text: ''
        });
        if (this.props.onCancel) this.props.onCancel(e);
        if (this.props.onChange) this.props.onChange('', e);
    }

    clearHandle(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({text: '', clearing: true});
        if (this.props.onClear) this.props.onClear(e);
        // In most cases, you can attach a ref to the DOM node and avoid using findDOMNode at all.
        // When render returns null or false, findDOMNode returns null.
        // 这里是截取官网的说明，在ref回调函数内确实会返回null，尤其是配合redux使用的时候，这个时候需要对其进行null判断
        this.refs.searchInput.focus();
        // ReactDOM.findDOMNode(this.refs.searchInput).focus()
        if (this.props.onChange) this.props.onChange('', e);
    }

    blurHandle(e) {
        if (this.state.text === ''){
            this.setState({ focus: false});
        }
    }

    submitHandle(e) {
        if (this.props.onSubmit) {
            e.preventDefault();
            e.stopPropagation();
            this.props.onSubmit(this.state.text, e);
        }
    }

    render() {
        const {children, defaultValue, autocomplete, placeholder, className, searchName} = this.props;
        const clz = classNames({
            'weui-search-bar': true,
            'weui-search-bar_focusing': this.state.focus
        }, className);

        return (
            <div className={clz}>
                <form className='weui-search-bar__form' onSubmit={this.submitHandle.bind(this)}>
                    <div className='weui-search-bar__box'>
                        <Icon value='search'/>
                        <input
                            ref='searchInput'
                            type='search'
                            name={searchName}
                            className='weui-search-bar__input'
                            placeholder={placeholder}
                            onFocus={e=>this.setState({focus: true})}
                            onBlur={this.blurHandle.bind(this)}
                            onChange={this.changeHandle.bind(this)}
                            value={this.state.text}
                            autoComplete={autocomplete}
                        />
                        {/*React will not trigger onMouseDown when not onClick presented*/}
                        <a
                            className='weui-icon-clear'
                            onClick={this.clearHandle.bind(this)}
                        />
                    </div>
                    <label
                        className='weui-search-bar__label'
                        onClick={()=>{
                            let searchInput = this.refs.searchInput;
                            if (searchInput) {
                                searchInput.focus();
                            }
                        }}
                        style={{display: this.state.text ? 'none' : null}}
                    >
                        <Icon value='search'/>
                        <span>{placeholder}</span>
                    </label>
                </form>
                <a className='weui-search-bar__cancel-btn' onClick={this.cancelHandle.bind(this)}>{this.props.lang.cancel}</a>
            </div>
        );
    }
}

export default SearchBar;
