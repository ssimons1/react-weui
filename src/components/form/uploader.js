import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Icon from '../icon';
import classNames from '../../utils/classnames';
import deprecationWarning from '../../utils/deprecationWarning';

/**
 * @description weui style uploader
 * @example
 * import React, {Component} from 'react';
 * import Page from '../../component/page';
 * import { Gallery, GalleryDelete, Uploader, Form, Cell, CellBody } from '../../../build/packages';
 * import photoSrc from './photo.png';
 * import thumbSrc from './thumb.png';
 * class UploaderDemo extends Component {
 *     constructor(props){
 *         super(props)
 *         this.state = {
 *             gallery: false,
 *             demoFiles : [
 *                 {
 *                     url: thumbSrc,
 *                 },
 *                 {
 *                     url: photoSrc
 *                 },
 *                 {
 *                     url: thumbSrc
 *                 },
 *                 {
 *                     url: photoSrc,
 *                     error: true
 *                 },
 *                 {
 *                     url: thumbSrc,
 *                     status: '50%'
 *                 }
 *             ]
 *         };
 *     }
 *     renderGallery(){
 *         if(!this.state.gallery) return false;
 *         let srcs = this.state.demoFiles.map(file=>file.url)
 *         return (
 *             <Gallery
 *                 src={srcs}
 *                 show
 *                 defaultIndex={this.state.gallery.id}
 *                 onClick={ e=> {
 *                     //avoid click background item
 *                     e.preventDefault()
 *                     e.stopPropagation();
 *                     this.setState({gallery: false})
 *                 }}
 *             >
 *                 <GalleryDelete onClick={ (e, id)=> {
 *                     this.setState({
 *                         demoFiles: this.state.demoFiles.filter((e,i)=>i != id),
 *                         gallery: this.state.demoFiles.length <= 1 ? true : false
 *                     })
 *                 }} />
 *             </Gallery>
 *         )
 *     }
 *     render(){
 *         return (
 *             <Page className="cell" title="Uploader" subTitle="上传组件，一般配合Gallery使用">
 *                 { this.renderGallery() }
 *                 <Form>
 *                     <Cell>
 *                         <CellBody>
 *                             <Uploader
 *                                 title="Image Uploader"
 *                                 maxCount={6}
 *                                 files={this.state.demoFiles}
 *                                 onError={msg => alert(msg)}
 *                                 onChange={(file,e) => {
 *                                     let newFiles = [...this.state.demoFiles, {url:file.data}];
 *                                     this.setState({
 *                                         demoFiles: newFiles
 *                                     });
 *                                 }}
 *                                 onFileClick={
 *                                     (e, file, i) => {
 *                                         console.log('file click', file, i)
 *                                         this.setState({
 *                                             gallery: {
 *                                                 url: file.url,
 *                                                 id: i
 *                                             }
 *                                         })
 *                                     }
 *                                 }
 *                                 lang={{
 *                                     maxError: maxCount => `Max ${maxCount} images allow`
 *                                 }}
 *                             />
 *                         </CellBody>
 *                     </Cell>
 *                 </Form>
 *             </Page>
 *         );
 *     }
 * }
 * export default UploaderDemo;
 *
 */

export default class Uploader extends Component {
    static propTypes = {
        /**
         * @property {PropTypes.string} title - title of uploader
         *
         */
        title: PropTypes.string,
        /**
         * @property {PropTypes.number} maxCount - max amount of allow file
         *
         */
        maxCount: PropTypes.number,
        /**
         * @property {PropTypes.number} maxWidth - maxWidth of image for uploader to compress
         *
         */
        maxWidth: PropTypes.number,
        /**
         * @property {PropTypes.func} onChange - when file change, pass property `(event, file)`
         *
         */
        onChange: PropTypes.func,
        /**
         * @property {PropTypes.func} onError - when there is error, pass property `msg`
         *
         */
        onError: PropTypes.func,
        /**
         * @property {PropTypes.array} files - array of photos thumbnails to indicator status, include property `url`, `status`, `error`
         *
         */
        files: PropTypes.array,
        /**
         * @property {PropTypes.object} lang - languages object, with property `maxError`
         *
         */
        lang: PropTypes.object
    };

    static defaultProps = {
        title: '图片上传',
        maxCount: 4,
        maxWidth: 500,
        files: [],
        onChange: undefined,
        onError: undefined,
        lang: { maxError: maxCount => `最多只能上传${maxCount}张图片` }
    };

    /**
     * Detecting vertical squash in loaded image.
     * Fixes a bug which squash image vertically while drawing into canvas for some images.
     * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
     * With react fix by n7best
     */
    detectVerticalSquash(img) {
        let data;
        let ih = img.naturalHeight;
        let canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = ih;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        try {
            // Prevent cross origin error
            data = ctx.getImageData(0, 0, 1, ih).data;
        } catch (err) {
            // hopeless, assume the image is well and good.
            console.log('Cannot check verticalSquash: CORS?');
            return 1;
        }
        // search image edge pixel position in case it is squashed vertically.
        let sy = 0;
        let ey = ih;
        let py = ih;
        while (py > sy) {
            let alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) {
                ey = py;
            } else {
                sy = py;
            }
            py = (ey + sy) >> 1;
        }
        let ratio = (py / ih);
        return (ratio === 0) ? 1 : ratio;
    }


    handleFile(file, cb) {
        let reader;
        if (typeof FileReader !== 'undefined') {
           reader = new FileReader();
        } else {
           if (window.FileReader) reader = new window.FileReader();
        }

        reader.onload = e => {
            let img;
            if (typeof Image !== 'undefined') {
               img = new Image();
            } else {
               if (window.Image) img = new window.Image();
            }
            img.onload = ()=>{
                let w = Math.min(this.props.maxWidth, img.width);
                let h = img.height * (w / img.width);
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');

                //check canvas support, for test
                if (ctx){
                    //patch subsampling bug
                    //http://jsfiddle.net/gWY2a/24/
                    let drawImage = ctx.drawImage;
                    ctx.drawImage = (_img, sx, sy, sw, sh, dx, dy, dw, dh) =>
                    {
                        let vertSquashRatio = 1;
                        // Detect if img param is indeed image
                        if (!!_img && _img.nodeName === 'IMG')
                        {
                            vertSquashRatio = this.detectVerticalSquash(_img);
                            if (typeof sw === 'undefined') (sw = _img.naturalWidth);
                            if (typeof sh === 'undefined') (sh = _img.naturalHeight);
                        }

                        // Execute several cases (Firefox does not handle undefined as no param)
                        // by call (apply is bad performance)
                        if (arguments.length === 9)
                            drawImage.call(ctx, _img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
                        else if (typeof sw !== 'undefined')
                            drawImage.call(ctx, _img, sx, sy, sw, sh / vertSquashRatio);
                        else
                            drawImage.call(ctx, _img, sx, sy);
                    };

                    canvas.width = w;
                    canvas.height = h;
                    ctx.drawImage(img, 0, 0, w, h);

                    let base64 = canvas.toDataURL('image/png');

                    cb({
                        nativeFile: file,
                        lastModified: file.lastModified,
                        lastModifiedDate: file.lastModifiedDate,
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        data: base64
                    }, e);
                } else {
                    cb(file, e);
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    handleChange(e) {
        const langs = this.props.lang;
        let _files = e.target.files;

        if (_files.length === 0) return;

        if (this.props.files.length >= this.props.maxCount) {
            this.props.onError(langs.maxError(this.props.maxCount));
            return;
        }

        for (let key in _files) {
            if (!_files.hasOwnProperty(key)) continue;
            let file = _files[key];

            this.handleFile(file, (_file, _e)=>{
                if (this.props.onChange) this.props.onChange(_file, _e);
                ReactDOM.findDOMNode(this.refs.uploader).value = '';
            }, e);
        }
    }

    renderFiles(){
        return this.props.files.map((file, idx)=>{
            let {url, error, status, onClick, ...others} = file;
            let fileStyle = {
                backgroundImage: `url(${url})`
            };
            let cls = classNames({
                'weui-uploader__file': true,
                'weui-uploader__file_status': error || status
            });

            if (onClick){
                deprecationWarning('File onClick', 'Uploader onFileClick');
            }

            let handleFileClick = onClick ? onClick : e => {
                if (this.props.onFileClick) this.props.onFileClick(e, file, idx);
            };

            return (
                <li className={cls} key={idx} style={fileStyle} onClick={handleFileClick} {...others}>
                    {
                        error || status ?
                        <div className="weui-uploader__file-content">
                            { error ? <Icon value="warn" /> : status }
                        </div>
                        : false
                    }
                </li>
            );
        });
    }

    render(){
        const { className, title, maxCount, files, onChange, onFileClick, ...others } = this.props;
        const inputProps = Object.assign({}, others);
        delete inputProps.lang;
        delete inputProps.onError;
        delete inputProps.maxWidth;

        const cls = classNames({
            'weui-uploader': true,
            [className]: className
        });

        return (
            <div className={cls}>
                <div className="weui-uploader__hd">
                    <p className="weui-uploader__title">{title}</p>
                    <div className="weui-uploader__info">{files.length}/{maxCount}</div>
                </div>
                <div className="weui-uploader__bd">
                    <ul className="weui-uploader__files">
                        {this.renderFiles()}
                    </ul>
                    <div className="weui-uploader__input-box">
                        <input
                        ref="uploader"//let react to reset after onchange
                        className="weui-uploader__input"
                        type="file"
                        accept="image/*"
                        capture="camera"
                        onChange={this.handleChange.bind(this)}
                        {...inputProps}
                        />
                    </div>
                </div>
            </div>
        );
    }
};
