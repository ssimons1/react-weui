import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';

/**
 * @description ButtonPreview component
 * @example
 * import React from 'react';
 * import Page from '../../component/page';
 * import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton } from '../../../build/packages';
 * const PreviewDemo = (props) => (
 *     <Page className="preview" title="Preview" subTitle="表单预览">
 *         <Preview>
 *             <PreviewHeader>
 *                 <PreviewItem label="Total" value="$49.99" />
 *             </PreviewHeader>
 *             <PreviewBody>
 *                 <PreviewItem label="Product" value="Name" />
 *                 <PreviewItem label="Description" value="Product Description" />
 *                 <PreviewItem label="Details" value="Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. " />
 *             </PreviewBody>
 *             <PreviewFooter>
 *                 <PreviewButton primary>Action</PreviewButton>
 *             </PreviewFooter>
 *         </Preview>
 *         <br/>
 *         <Preview>
 *             <PreviewHeader>
 *                 <PreviewItem label="Total" value="$49.99" />
 *             </PreviewHeader>
 *             <PreviewBody>
 *                 <PreviewItem label="Product" value="Name" />
 *                 <PreviewItem label="Description" value="Product Description" />
 *                 <PreviewItem label="Details" value="Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. " />
 *             </PreviewBody>
 *             <PreviewFooter>
 *                 <PreviewButton >Action</PreviewButton>
 *                 <PreviewButton primary>Action</PreviewButton>
 *             </PreviewFooter>
 *         </Preview>
 *     </Page>
 * );
 * export default PreviewDemo;
 */

const PreviewButton = (props) => {
    const { className, primary, children, ...others } = props;
    const cls = classNames({
        'weui-form-preview__btn': true,
        'weui-form-preview__btn_default': !primary,
        'weui-form-preview__btn_primary': primary,
        [className]: className
    });

    return (
        <a className={cls} {...others}>
            {children}
        </a>
    );
};

PreviewButton.propTypes = {
    /**
     * @property {PropTypes.bool} primary - Primary style of button
     *
     */
    primary: PropTypes.bool
};

PreviewButton.defaultProps = {
    primary: false
};

export default PreviewButton;
