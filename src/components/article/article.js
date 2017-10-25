import React from 'react';
import classNames from '../../utils/classnames';

/**
 * @description Use to format WeUI style contents
 * @example
 * import React from 'react';
 * import { Article } from '../../../build/packages';
 * import srcArticle from './pic_article.png';
 * import Page from '../../component/page';
 * const ListDemo = (props) => (
 *     <Page className="article" title="Article" subTitle="文章">
 *         <Article>
 *             <h1>H1 Heading</h1>
 *             <section>
 *                 <h2 className="title">H2 Title</h2>
 *                 <section>
 *                     <h3>H3 Heading</h3>
 *                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
 *                         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
 *                         quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
 *                         consequat. Duis aute</p>
 *                     <p>
 *                         <img src={srcArticle} alt/>
 *                         <img src={srcArticle} alt/>
 *                     </p>
 *                 </section>
 *                 <section>
 *                     <h3>H3 Heading</h3>
 *                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
 *                         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
 *                         cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
 *                         proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
 *                 </section>
 *             </section>
 *         </Article>
 *     </Page>
 * );
 * export default ListDemo;
 */

export default class Article extends React.Component {
    static propTypes = {
    };

    static defaultProps = {
    };
    render() {
        const {className, children, ...others} = this.props;
        const cls = classNames({
            'weui-article': true,
            [className]: className
        });
        return (
            <article className={cls} {...others}>
                {children}
            </article>
        );
    }
};