import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import Swiper from '../swiper';

/**
 * @description Full screen photo display
 * @example
 * import React, { Component } from 'react';
 * import Page from '../../component/page';
 * import { Gallery, GalleryDelete, Button, Icon } from '../../../build/packages';
 * import imgSrc from '../uploader/photo.png';
 * import imgSrc2 from './2.png';
 * import imgSrc3 from './3.png';
 * class GalleryDemo extends Component {
 *     constructor(props){
 *         super(props)
 *         this.state = {
 *             showSingle: false,
 *             showMultiple: false,
 *         }
 *     }
 *     render(){
 *         const BackButtonStyle = {
 *             display: 'inline-block',
 *             width: 'auto',
 *             color: 'white',
 *             border: 'none',
 *             position: 'absolute',
 *             top: '5px',
 *             left: '15px'
 *         }
 *         return (
 *             <Page className="gallery" title="Gallery" subTitle="画廊，可实现上传图片的展示或幻灯片播放">
 *                 <div
 *                     style={{ padding: '0 15px'}}
 *                 >
 *                     <Button
 *                         type="default"
 *                         onClick={e=>this.setState({ showSingle: true})}
 *                     >
 *                     Show Single Image
 *                     </Button>
 *                     <Button
 *                         type="default"
 *                         onClick={e=>this.setState({ showMultiple: true})}
 *                     >
 *                     Show Multiple Images
 *                     </Button>
 *                 </div>
 *                 <Gallery src={imgSrc} show={this.state.showSingle}>
 *                     <Button
 *                         style={BackButtonStyle}
 *                         onClick={e=>this.setState({ showSingle: false})}
 *                         plain
 *                     >
 *                         Back
 *                     </Button>
 *                     <GalleryDelete
 *                         onClick={ (e, i)=> alert('click deleted id:' + i) }
 *                     />
 *                 </Gallery>
 *                 <Gallery src={[imgSrc, imgSrc2, imgSrc3]} show={this.state.showMultiple}>
 *                     <Button
 *                         style={BackButtonStyle}
 *                         onClick={e=>this.setState({ showMultiple: false})}
 *                         plain
 *                     >
 *                         Back
 *                     </Button>
 *                     <GalleryDelete
 *                         onClick={ (e, i)=> alert('click deleted id:' + i) }
 *                     />
 *                 </Gallery>
 *             </Page>
 *         )
 *     }
 * }
 * export default GalleryDemo;
 *
 */

class Gallery extends Component {
    static propTypes = {
        /**
         * @property {PropTypes.bool} show - indicate whather the component is display
         *
         */
        show: PropTypes.bool,
        /**
         * @property {PropTypes.string|PropTypes.array} src - image source, string for single element, array for multiple element
         *
         */
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]),
        /**
         * @property {PropTypes.number} defaultIndex - indicate whather the component is display
         *
         */
        defaultIndex: PropTypes.number,
    };

    static defaultProps = {
        show: undefined,
        src: '',
        defaultIndex: 0
    }

    constructor(props){
        super(props);

        this.state = {
            currentIndex: this.props.defaultIndex
        };
    }

    handleClick(func){
        return (e)=>{
            if (func) func(e, this.state.currentIndex);
        };
    }

    renderImages(imgs){
        return (
            <div className="weui-gallery__img">
                <Swiper
                    indicators={false}
                    defaultIndex={this.props.defaultIndex}
                    onChange={ (prev, next) => this.setState({currentIndex: next}) }
                >
                    {
                        imgs.map( (img, i) => {
                            const imgStyle = {
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center'
                            };
                            return (
                                <span key={i} style={imgStyle}></span>
                            );
                        })
                    }
                </Swiper>
            </div>
        );
    }

    renderOprs(){
        if (Array.isArray(this.props.children)){
            return this.props.children.map( (child, i) => {
                return React.cloneElement(child, {
                    key: i,
                    onClick: this.handleClick(child.props.onClick)
                });
            });
        } else {
            if (this.props.children){
                return React.cloneElement(this.props.children, {
                    onClick: this.handleClick(this.props.children.props.onClick)
                });
            } else {
                return false;
            }
        }
    }

    render(){
        const { children, className, show, src, defaultIndex, ...others } = this.props;
        const cls = classNames({
            'weui-gallery': true,
            [className]: className
        });

        if (!show) return false;

        return (
            <div className={cls} style={{display: show ? 'block' : 'none'}} {...others}>
                {
                    Array.isArray(src) ? this.renderImages(src)
                    : <span className="weui-gallery__img" style={{backgroundImage: `url(${src})`}}></span>
                }

                <div className="weui-gallery__opr">
                    {
                        this.renderOprs()
                    }
                </div>
            </div>
        );
    }
}

export default Gallery;
