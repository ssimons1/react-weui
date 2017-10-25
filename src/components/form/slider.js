import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from '../../utils/classnames';

/**
 * @description A Slider is an element used to set a value, good choice when users think it as relative quantity rather than value
 * @example
 * import React from 'react';
 * import { Slider, CellsTitle, Button, ButtonArea } from '../../../build/packages';
 * import Page from '../../component/page';
 * class SliderDemo extends React.Component {
 *     state = {
 *         controlValue: 50
 *     };
 *     render() {
 *         return (
 *             <Page className="slider" title="Slider" subTitle="滑块" spacing>
 *                 <CellsTitle>Basic Example</CellsTitle>
 *                 <Slider
 *                     min={1}
 *                     max={5}
 *                     step={1}
 *                     onChange={ value => console.log(value) }
 *                 />
 *                 <CellsTitle>Disabled Example</CellsTitle>
 *                 <Slider
 *                     disabled
 *                     onChange={ value => console.log(value) }
 *                 />
 *                 <CellsTitle>Controlled Example</CellsTitle>
 *                 <Slider
 *                     max={100}
 *                     step={2}
 *                     value={this.state.controlValue}
 *                     onChange={ value => this.setState({ controlValue: value }) }
 *                 />
 *                 <ButtonArea>
 *                     <Button
 *                         size="small"
 *                         onClick={()=> {
 *                             if(this.state.controlValue >= 10) this.setState({ controlValue: this.state.controlValue - 10})
 *                         }}>
 *                         - 10
 *                     </Button>
 *                     <Button
 *                         style={{marginLeft: '10px'}}
 *                         size="small"
 *                         onClick={()=> {
 *                             if(this.state.controlValue <= 90) this.setState({ controlValue: this.state.controlValue + 10})
 *                         }}>
 *                         + 10
 *                     </Button>
 *                 </ButtonArea>
 *                 <br/>
 *                 <CellsTitle>No snap & No show value</CellsTitle>
 *                 <Slider
 *                     snapToValue={false}
 *                     showValue={false}
 *                 />
 *             </Page>
 *         );
 *     }
 * };
 * export default SliderDemo
 */

class Slider extends Component {

    static propTypes = {
        /**
         * @property {PropTypes.number} max - max value of the slider
         *
         */
        max: PropTypes.number,
        /**
         * @property {PropTypes.number} min - min value of the slider
         *
         */
        min: PropTypes.number,
        /**
         * @property {PropTypes.number} step - the offset between two number in the slider
         *
         */
        step: PropTypes.number,
        /**
         * @property {PropTypes.bool} showValue - display the value indicator
         *
         */
        showValue: PropTypes.bool,
        /**
         * @property {PropTypes.bool} disabled - whether input is disabled
         *
         */
        disabled: PropTypes.bool,
        /**
         * @property {PropTypes.number} value - slider value when use as controll element
         *
         */
        value: PropTypes.number,
        /**
         * @property {PropTypes.number} defaultValue - slider value when use as non-controll element, use with onChange
         *
         */
        defaultValue: PropTypes.number,
        /**
         * @property {PropTypes.func} onChange - callback when slider value change, pass value and event instance
         *
         */
        onChange: PropTypes.func,
        /**
         * @property {PropTypes.bool} snapToValue - callback when slider value change, pass value and event instance
         *
         */
        snapToValue: PropTypes.bool,
    };

    static defaultProps = {
        max: 100,
        min: 0,
        step: 1,
        showValue: true,
        disabled: false,
        defaultValue: 0,
        snapToValue: true
    };

    constructor(props){
        super(props);

        this.state = {
            value: this.props.value ? this.props.value : this.props.defaultValue ? this.props.defaultValue : 0,
            controlled: typeof this.props.value !== 'undefined',
            totalWidth: 0,

            touching: false,
            ogX: 0,
            touchID: undefined,
            percent: this.props.value ? parseInt( this.props.value / (this.props.max - this.props.min) * 100 ) :
                     this.props.defaultValue ? parseInt( this.props.defaultValue / (this.props.max - this.props.min) * 100 ) : 0,
            animating: false
        };

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    componentDidMount(){
        if (this.state.value === 0) this.updateValue();
    }

    componentWillReceiveProps(nextProps){
        if (this.state.controlled){
            if (nextProps.value <= this.props.max && nextProps.value >= this.props.min){
                let percent = parseInt( nextProps.value / (this.props.max - this.props.min) * 100 );
                this.setState({ value: nextProps.value, percent });
            }
        }
    }

    updateValue(snap = false){
        let value = 0;
        const percent = this.state.percent,
              { min, max, step, onChange } = this.props,
              steps = parseInt( ( max - min ) / step ),
              perPercent = parseInt( 100 / steps );

        if ( percent === 100){
            value = max;
        } else if ( percent === 0 ){
            value = min;
        } else {
            for (let i = 0; i < steps; i++){
                //over 50 margin than next
                if ( percent > ( i * perPercent ) && percent <= ( (i + 1) * perPercent ) ) {
                    value = percent - (i * perPercent) > ( perPercent / 2 ) ? (i + 1) * step + min : i * step + min;
                }
            }
        }

        if (value !== this.state.value) {
            this.setState({ value });
            if (onChange) onChange(value);
        }

        if (snap) {
            this.setState({
                percent: value === min ? 0 : value === max ? 100 : ( ( value - min ) / step ) * perPercent,
                animating: true
            }, ()=>this.setState({ animating: false }));
        }

    }

    handleTouchStart(e){
        if (this.state.touching || this.props.disabled) return;
        let barDOM = ReactDOM.findDOMNode(this.refs.bar);
        this.setState({
            touching: true,
            touchId: e.targetTouches[0].identifier,
            totalWidth: barDOM.clientWidth,
        	ogX: e.targetTouches[0].pageX,
        	ogPercent: this.state.percent
        });
    }

    handleTouchMove(e){
        if (!this.state.touching || this.props.disabled) return;
        if (e.targetTouches[0].identifier !== this.state.touchId) return;

        //prevent move background
        e.preventDefault();

        const pageX = e.targetTouches[0].pageX;
        const diffX = pageX - this.state.ogX;

        let percent = parseInt(diffX / this.state.totalWidth * 100) + this.state.ogPercent;
        percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;

        this.setState({
            percent
        }, ()=>this.updateValue());
    }

    handleTouchEnd(e){
        if (!this.state.touching || this.props.disabled) return;

        if (this.props.snapToValue) {
            this.updateValue(true);
        }

        this.setState({
            touching: false,
            ogX: 0,
            touchId: undefined,
            ogPercent: 0
        });

    }

    render(){

        const { className, max, min, step, showValue, value, disabled, defaultValue, onChange, snapToValue, ...domProps } = this.props;

        let cls = classNames('weui-slider-box', className);

        let trackStyles = {
            width: `${this.state.percent}%`
        };

        let handlerStyles = {
            left: `${this.state.percent}%`,
            transition: this.state.animating ? 'transform .3s' : 'none'
        };

        return (
            <div className={cls}>
                <div className="weui-slider" { ...domProps }>
                    <div className="weui-slider__inner" ref="bar">
                        <div
                            style={trackStyles}
                            className="weui-slider__track"/>
                        <div
                            style={handlerStyles}
                            onTouchStart={this.handleTouchStart}
                            onTouchMove={this.handleTouchMove}
                            onTouchEnd={this.handleTouchEnd}
                            className="weui-slider__handler"/>
                    </div>
                </div>
                {
                    showValue ? <div className="weui-slider-box__value">{ this.state.value }</div> : false
                }
            </div>
        );
    }
}

export default Slider;
