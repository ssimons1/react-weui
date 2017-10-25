import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';

/**
 * @description weui wrapper for textarea
 * @example
 * import React from 'react';
 * import { ButtonArea,
 *     Button,
 *     CellsTitle,
 *     CellsTips,
 *     Cell,
 *     CellHeader,
 *     CellBody,
 *     CellFooter,
 *     Form,
 *     FormCell,
 *     Icon,
 *     Input,
 *     Label,
 *     TextArea,
 *     Switch,
 *     Radio,
 *     Checkbox,
 *     Select,
 *     VCode,
 *     Agreement,
 *     Toptips
 * } from '../../../build/packages';
 * import Page from '../../component/page';
 * import iconSrc from './images/icon.png';
 * import vcodeSrc from './images/vcode.jpg';
 * import avatarSrc from './images/avatar.jpg';
 * export default class inputDemo extends React.Component {
 *     constructor(props){
 *         super(props);
 *         this.state = {
 *             showToptips: false
 *         }
 *     }
 *     render(){
 *         return (
 *         <Page className="input" title="Input" subTitle="表单输入">
 *              <CellsTitle>Radio</CellsTitle>
 *             <Form radio>
 *                 <FormCell radio>
 *                     <CellBody>Option 1</CellBody>
 *                     <CellFooter>
 *                         <Radio name="radio1" value="1" defaultChecked/>
 *                     </CellFooter>
 *                 </FormCell>
 *                 <FormCell radio>
 *                     <CellBody>Option 2</CellBody>
 *                     <CellFooter>
 *                         <Radio name="radio1" value="2"/>
 *                     </CellFooter>
 *                 </FormCell>
 *                 <Cell link>
 *                     <CellBody>More</CellBody>
 *                 </Cell>
 *             </Form>
 *             <CellsTitle>Checkbox</CellsTitle>
 *             <Form checkbox>
 *                 <FormCell checkbox>
 *                     <CellHeader>
 *                         <Checkbox name="checkbox1" value="1"/>
 *                     </CellHeader>
 *                     <CellBody>Option 1</CellBody>
 *                 </FormCell>
 *                 <FormCell checkbox>
 *                     <CellHeader>
 *                         <Checkbox name="checkbox2" value="2" defaultChecked/>
 *                     </CellHeader>
 *                     <CellBody>Option 2</CellBody>
 *                 </FormCell>
 *                 <Cell link>
 *                     <CellBody>More</CellBody>
 *                 </Cell>
 *             </Form>
 *             <CellsTitle>Switch</CellsTitle>
 *             <Form>
 *                 <FormCell switch>
 *                     <CellBody>Switch Label</CellBody>
 *                     <CellFooter>
 *                         <Switch/>
 *                     </CellFooter>
 *                 </FormCell>
 *             </Form>
 *             <CellsTitle>Forms</CellsTitle>
 *             <Form>
 *                 <FormCell>
 *                     <CellHeader>
 *                         <Label>QQ</Label>
 *                     </CellHeader>
 *                     <CellBody>
 *                         <Input type="tel" placeholder="Enter your qq#"/>
 *                     </CellBody>
 *                 </FormCell>
 *                 <FormCell vcode>
 *                     <CellHeader>
 *                         <Label>Phone</Label>
 *                     </CellHeader>
 *                     <CellBody>
 *                         <Input type="tel" placeholder="Enter your cellphone #"/>
 *                     </CellBody>
 *                     <CellFooter>
 *                         <Button type="vcode">Send</Button>
 *                     </CellFooter>
 *                 </FormCell>
 *                 <FormCell>
 *                     <CellHeader>
 *                         <Label>Date</Label>
 *                     </CellHeader>
 *                     <CellBody>
 *                         <Input type="date" defaultValue="" onChange={ e=> console.log(e.target.value)}/>
 *                     </CellBody>
 *                 </FormCell>
 *                 <FormCell>
 *                     <CellHeader>
 *                         <Label>Datetime</Label>
 *                     </CellHeader>
 *                     <CellBody>
 *                         <Input type="datetime-local" defaultValue="" placeholder=""/>
 *                     </CellBody>
 *                 </FormCell>
 *                 <FormCell vcode>
 *                     <CellHeader>
 *                         <Label>VCode</Label>
 *                     </CellHeader>
 *                     <CellBody>
 *                         <Input type="number" placeholder="Enter the code"/>
 *                     </CellBody>
 *                     <CellFooter>
 *                         <VCode src={vcodeSrc} />
 *                     </CellFooter>
 *                 </FormCell>
 *             </Form>
 *             <CellsTips>Form Footer Tips</CellsTips>
 *             <CellsTitle>Warnings</CellsTitle>
 *             <Form>
 *                 <FormCell warn>
 *                     <CellHeader>
 *                         <Label>QQ</Label>
 *                     </CellHeader>
 *                     <CellBody>
 *                         <Input type="text" defaultValue="Oops..."/>
 *                     </CellBody>
 *                     <CellFooter>
 *                         <Icon value="warn" />
 *                     </CellFooter>
 *                 </FormCell>
 *             </Form>
 *             <CellsTitle>Textarea</CellsTitle>
 *             <Form>
 *                 <FormCell>
 *                     <CellBody>
 *                         <TextArea placeholder="Enter your comments" rows="3" maxlength="200"></TextArea>
 *                     </CellBody>
 *                 </FormCell>
 *             </Form>
 *             <CellsTitle>选择</CellsTitle>
 *                 <Form>
 *                     <FormCell select selectPos="before">
 *                         <CellHeader>
 *                             <Select>
 *                                 <option value="1">+86</option>
 *                                 <option value="2">+80</option>
 *                                 <option value="3">+84</option>
 *                                 <option value="4">+87</option>
 *                             </Select>
 *                         </CellHeader>
 *                         <CellBody>
 *                             <Input type="tel" placeholder="Enter Phone"/>
 *                         </CellBody>
 *                     </FormCell>
 *                 </Form>
 *             <CellsTitle>Selects</CellsTitle>
 *             <Form>
 *                 <FormCell select>
 *                     <CellBody>
 *                         <Select defaultValue="2">
 *                             <option value="1">WeChat</option>
 *                             <option value="2">QQ</option>
 *                             <option value="3">Email</option>
 *                         </Select>
 *                     </CellBody>
 *                 </FormCell>
 *                 <FormCell select selectPos="after">
 *                     <CellHeader>
 *                         <Label>Country</Label>
 *                     </CellHeader>
 *                     <CellBody>
 *                         <Select data={[
 *                             {
 *                                 value: 1,
 *                                 label: 'China'
 *                             },
 *                             {
 *                                 value: 2,
 *                                 label: 'United States'
 *                             },
 *                             {
 *                                 value: 3,
 *                                 label: 'Germany'
 *                             }
 *                         ]} />
 *                     </CellBody>
 *                 </FormCell>
 *             </Form>
 *             <Agreement>
 *             	&nbsp;&nbsp;I agree to the <a href="javascript:;">WeUI Terms and Privacy</a>
 *             </Agreement>
 *             <ButtonArea>
 *                 <Button
 *                     //button to display toptips
 *                     onClick={ e=> {
 *                         if(this.state.showToptips) return;
 *                         this.setState({showToptips: !this.state.showToptips})
 *                         window.setTimeout(e=> this.setState({showToptips: !this.state.showToptips}), 2000)
 *                     }
 *                 }>
 *                     OK
 *                 </Button>
 *             </ButtonArea>
 *             <Toptips type="warn"
 *                 show={this.state.showToptips}
 *             >
 *                 Oops, something is wrong!
 *             </Toptips>
 *         </Page>
 *         )
 *     }
 * }
 */

export default class TextArea extends Component {
    static propTypes = {
        /**
         * @property {PropTypes.bool} showCounter - display word counter
         *
         */
        showCounter: PropTypes.bool,
        /**
         * @property {PropTypes.number} maxLength - max character allow for textarea
         *
         */
        maxLength: PropTypes.number,
        /**
         * @property {PropTypes.string} defaultValue - max character allow for textarea
         *
         */
        defaultValue: PropTypes.string,
    };

    static defaultProps = {
        showCounter: true,
        defaultValue: undefined
    };

    state = {
        textCounter: this.props.defaultValue ? this.props.defaultValue.length : 0
    };

    handleChange(e){
        this.setState({textCounter: e.target.value.length});

        //forward event to props if any
        if (this.props.onChange) this.props.onChange(e);
    }

    render(){
        const { className, children, showCounter, maxLength, onChange, ...others } = this.props;
        const cls = classNames({
            'weui-textarea': true,
            [className]: className
        });

        return (
            <div>
                <textarea
                className={cls}
                maxLength={maxLength}
                onChange={this.handleChange.bind(this)}
                {...others}>
                    {children}
                </textarea>
                {
                    showCounter ?
                    <div className="weui-textarea-counter">
                        <span>{this.state.textCounter}</span>{maxLength ? '/' + maxLength : false}
                    </div>
                    : false
                }
            </div>
        );
    }
};
