import React from 'react';
import PropTypes from 'prop-types';
import Picker from './picker';

/**
 * @description An city pick component build on top of picker
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

class CityPicker extends React.Component {

    static propTypes = {
        /**
         * @property {PropTypes.array} data - Array of item trees, consists property for label and subitems
         *
         */
        data: PropTypes.array.isRequired,
        /**
         * @property {PropTypes.object} dataMap - keys for data provide, `id` to indicate property name for label, `items` to indicate property name for subitems
         *
         */
        dataMap: PropTypes.object,
        /**
         * @property {PropTypes.array} selected - currently selected item
         *
         */
        selected: PropTypes.array,
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
    }

    static defaultProps = {
        data: [],
        dataMap: { id: 'name', items: 'sub' },
        selected: [],
        show: false,
        lang: { leftBtn: '取消', rightBtn: '确定' }
    }

    constructor(props){
        super(props);
        const { data, selected, dataMap } = this.props;
        const { groups, newselected } = this.parseData(data, dataMap.items, selected);
        this.state = {
            groups,
            selected: newselected,
            picker_show: false,
            text: ''
        };
        //console.log(this.state.groups)
        this.updateGroup = this.updateGroup.bind(this);
        this.parseData = this.parseData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //@return array of group with options
    parseData(data, subKey, selected = [], group = [], newselected = []){
      let _selected = 0;

      if ( Array.isArray(selected) && selected.length > 0){
        let _selectedClone = selected.slice(0);
        _selected = _selectedClone.shift();
        selected = _selectedClone;
      }

      if (typeof data[_selected] === 'undefined'){
          _selected = 0;
      }

      newselected.push(_selected);

      let item = data[_selected];

      var _group = JSON.parse(JSON.stringify(data));
      _group.forEach(g=>delete g[subKey]);
      group.push({ items: _group, mapKeys: { 'label': this.props.dataMap.id } });

      if (typeof item[subKey] !== 'undefined' && Array.isArray(item[subKey])){
        return this.parseData(item[subKey], subKey, selected, group, newselected);
      } else {
        return { groups: group, newselected };
      }
    }

    updateDataBySelected(selected, cb){
        const { data, dataMap } = this.props;
        //validate if item exists

        const { groups, newselected } = this.parseData(data, dataMap.items, selected);

        let text = '';
        try {
            groups.forEach( (group, _i) => {
                text += `${group['items'][selected[_i]][this.props.dataMap.id]} `;
            });
        } catch (err){
            //wait
            text = this.state.text;
        }

        this.setState({
            groups,
            text,
            selected: newselected
        }, ()=>cb());
    }


    updateGroup(item, i, groupIndex, selected, picker){
        this.updateDataBySelected(selected, ()=>{
            //update picker
            picker.setState({
                selected: this.state.selected
            });
        });
    }

    handleChange(selected){
        //handle unchange
        if (selected === this.state.selected){
            this.updateDataBySelected(selected, ()=>{
                if (this.props.onChange) this.props.onChange(this.state.text);
            });
        }

        if (this.props.onChange) this.props.onChange(this.state.text);
    }

    render(){
        return (
            <Picker
                show={this.props.show}
                onGroupChange={this.updateGroup}
                onChange={this.handleChange}
                defaultSelect={this.state.selected}
                groups={this.state.groups}
                onCancel={this.props.onCancel}
                lang={this.props.lang}
            />
        );
    }
}

export default CityPicker;
