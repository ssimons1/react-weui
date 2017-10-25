import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PickerGroup from './picker_group';
import classNames from '../../utils/classnames';
import Mask from '../mask';

/**
 * @description Mobile select ui, currently only support Touch Events
 * @example
 * import React from 'react';
 * import { Popup, Picker, CityPicker, Form, FormCell, CellBody, CellHeader, Label, Input } from '../../../build/packages';
 * import Page from '../../component/page';
 * import cnCity from './cnCity';
 * class PickerDemo extends React.Component {
 *     state = {
 *         picker_show: false,
 *         picker_value: '',
 *         picker_group: [
 *             {
 *                 items: [
 *                     {
 *                         label: 'Item1'
 *                     },
 *                     {
 *                         label: 'Item2 (Disabled)',
 *                         disabled: true
 *                     },
 *                     {
 *                         label: 'Item3'
 *                     },
 *                     {
 *                         label: 'Item4'
 *                     },
 *                     {
 *                         label: 'Item5'
 *                     }
 *                 ]
 *             }
 *         ],
 *         city_show: false,
 *         city_value: ''
 *     };
 *     hide(){
 *         this.setState({
 *             picker_show: false,
 *             city_show: false
 *         })
 *     }
 *     render() {
 *         return (
 *             <Page className="picker" title="Picker" subTitle="多列选择器" >
 *                 <Form>
 *                     <FormCell>
 *                         <CellHeader>
 *                             <Label>City</Label>
 *                         </CellHeader>
 *                         <CellBody>
 *                             <Input type="text"
 *                                 value={this.state.city_value}
 *                                 onClick={ e=> {
 *                                     e.preventDefault();
 *                                     this.setState({city_show: true})
 *                                 }}
 *                                 placeholder="Chose Your City"
 *                                 readOnly={true}
 *                             />
 *                         </CellBody>
 *                     </FormCell>
 *                 </Form>
 *                 <CityPicker
 *                     data={cnCity}
 *                     onCancel={e=>this.setState({city_show: false})}
 *                     onChange={text=>this.setState({city_value: text, city_show: false})}
 *                     show={this.state.city_show}
 *                 />
 *                 <Form>
 *                     <FormCell>
 *                         <CellHeader>
 *                             <Label>Direct Picker</Label>
 *                         </CellHeader>
 *                         <CellBody>
 *                             <Input
 *                                 type="text"
 *                                 onClick={e=>{
 *                                     e.preventDefault()
 *                                     this.setState({picker_show: true})
 *                                 }}
 *                                 placeholder="Pick a item"
 *                                 value={this.state.picker_value}
 *                                 readOnly={true}
 *                             />
 *                         </CellBody>
 *                     </FormCell>
 *                 </Form>
 *                 <Picker
 *                     onChange={selected=>{
 *                         let value = ''
 *                         selected.forEach( (s, i)=> {
 *                             value = this.state.picker_group[i]['items'][s].label
 *                         })
 *                         this.setState({
 *                             picker_value: value,
 *                             picker_show: false
 *                         })
 *                     }}
 *                     groups={this.state.picker_group}
 *                     show={this.state.picker_show}
 *                     onCancel={e=>this.setState({picker_show: false})}
 *                 />
 *                 <br/>
 *             </Page>
 *         );
 *     }
 * };
 * export default PickerDemo;
 *
 */

class Picker extends Component {
    static propTypes = {
        /**
         * @property {PropTypes.array} actions - consists of array of object(max 2) with property `label` and others pass into element
         *
         */
        actions: PropTypes.array,
        /**
         * @property {PropTypes.array} groups - array objects consists of groups for each scroll group
         *
         */
        groups: PropTypes.array,
        /**
         * @property {PropTypes.array} defaultSelect - default group index thats selected, if not provide, automatic chose the best fiting item when mounted
         *
         */
        defaultSelect: PropTypes.array,
        /**
         * @property {PropTypes.func} onGroupChange - trigger when individual group change, pass property(`item`, `item index in group`, `group index in groups`, `selected`, `picker instance`)
         *
         */
        onGroupChange: PropTypes.func,
        /**
         * @property {PropTypes.func} onChange - on selected change, pass property `selected` for array of slected index to `groups`
         *
         */
        onChange: PropTypes.func,
        /**
         * @property {PropTypes.func} onCancel - excute when the popup about to close
         *
         */
        onCancel: PropTypes.func,
        /**
         * @property {PropTypes.bool} show - display the component
         *
         */
        show: PropTypes.bool,
        /**
         * @property {PropTypes.object} lang - language object consists of `leftBtn` and `rightBtn`
         *
         */
        lang: PropTypes.object,
    };

    static defaultProps = {
        actions: [],
        groups: [],
        show: false,
        lang: { leftBtn: 'Cancel', rightBtn: 'Ok' },
    }

    constructor(props){
        super(props);

        this.state = {
            selected: this.props.defaultSelect ? this.props.defaultSelect : Array(this.props.groups.length).fill(-1),
            actions: this.props.actions.length > 0 ? this.props.actions : [{
                label: this.props.lang.leftBtn,
                onClick: e=>this.handleClose( ()=> {if (this.props.onCancel) this.props.onCancel(e);} )
            },
            {
                label: this.props.lang.rightBtn,
                onClick: e=>this.handleChanges()
            }],
            closing: false
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChanges(){
        this.handleClose( ()=> { if (this.props.onChange) this.props.onChange(this.state.selected, this); } );
    }

    handleChange(item, i, groupIndex){
        let selected = this.state.selected;

        selected[groupIndex] = i;
        this.setState({ selected }, ()=>{
            if (this.props.onGroupChange) this.props.onGroupChange(item, i, groupIndex, this.state.selected, this);
        });
    }

    handleClose(cb){
        this.setState({
            closing: true
        }, ()=> setTimeout( ()=> {
            this.setState({ closing: false });
            cb();
        }, 300));
    }

    renderActions(){
        let elActions = this.state.actions.map( (action, i)=> {
            const { label, ...others } = action;
            return <a {...others} key={i} className="weui-picker__action"> { label }</a>;
        });

        return (
            <div className="weui-picker__hd">
                { elActions }
            </div>
        );
    }

    renderGroups(){
        return this.props.groups.map( (group, i) => {
            return <PickerGroup key={i} {...group} onChange={this.handleChange} groupIndex={i} defaultIndex={this.state.selected[i]} />;
        });
    }

    render(){
        const { className, show, actions, groups, defaultSelect, onGroupChange, onChange, onCancel, ...others } = this.props;
        const cls = classNames('weui-picker', {
            'weui-animate-slide-up': show && !this.state.closing,
            'weui-animate-slide-down': this.state.closing
        }, className);

        const maskCls = classNames({
            'weui-animate-fade-in': show && !this.state.closing,
            'weui-animate-fade-out': this.state.closing
        });

        return this.props.show ? (
            <div>
                <Mask className={maskCls} onClick={e=>this.handleClose( ()=> {if (this.props.onCancel) this.props.onCancel(e);} )} />
                <div className={cls} {...others}>
                    { this.renderActions() }
                    <div className="weui-picker__bd">
                        { this.renderGroups() }
                    </div>
                </div>
            </div>
        ) : false;
    }
}

export default Picker;
