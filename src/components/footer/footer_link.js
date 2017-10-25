import React from 'react';
import classNames from '../../utils/classnames';

/**
 * @description foot link wrapper for link
 * @example
 * import React from 'react';
 * import {
 *     Footer,
 *     FooterText,
 *     FooterLinks,
 *     FooterLink
 * } from '../../../build/packages';
 * import Page from '../../component/page';
 * const FooterDemo = (props) => (
 *     <Page className="footer" title="Footer" subTitle="页脚" spacing>
 *         <Footer>
 *             <FooterText>Copyright &copy; 2008-2016 weui.io</FooterText>
 *         </Footer>
 *         <br/><br/>
 *         <Footer>
 *             <FooterLinks>
 *                 <FooterLink href="javascript:void(0);">Link</FooterLink>
 *             </FooterLinks>
 *             <FooterText>Copyright &copy; 2008-2016 weui.io</FooterText>
 *         </Footer>
 *         <br/><br/>
 *         <Footer>
 *             <FooterLinks>
 *                 <FooterLink href="javascript:void(0);">Link</FooterLink>
 *                 <FooterLink href="javascript:void(0);">Link</FooterLink>
 *             </FooterLinks>
 *             <FooterText>Copyright &copy; 2008-2016 weui.io</FooterText>
 *         </Footer>
 *     </Page>
 * );
 * export default FooterDemo;
 *
 */

const FooterLink = (props) => {
    const { className, children, ...others } = props;
    const cls = classNames({
        'weui-footer__link': true,
        [className]: className
    });

    return (
        <a className={cls} {...others}>
            {children}
        </a>
    );
};

export default FooterLink;