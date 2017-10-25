import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import GridIcon from './grid_icon';
import GridLabel from './grid_label';

/**
 * @description WeUI Grid wrapper, contain elements of `GridIcon` and `GridLabel`
 * @example
 * import React from 'react';
 * import { Grids } from '../../../build/packages';
 * import Page from '../../component/page';
 * import iconSrc from './icon_tabbar.png';
 * const data = Array(9).fill({
 *     icon: <img src={iconSrc}/>,
 *     label: 'Grid',
 *     href: 'javascript:;'
 * })
 * const GridDemo = (props) => (
 *     <Page className="grid" title="Grid" subTitle="九宫格">
 *         <Grids data={data}/>
 *     </Page>
 * );
 * export default GridDemo;
 *
 */

export default class Grid extends React.Component {
    static propTypes = {
      /**
       * @property {PropTypes.string} label - Label string for grid
       *
       */
      label: PropTypes.string,
      /**
       * @property {PropTypes.any} icon - Icon placeholder
       *
       */
      icon: PropTypes.any,
      /**
       * @property {PropTypes.func} component - pass in an component to replace Grid but apply same style
       */
      component: PropTypes.func
    };

    static defaultProps = {
      label: '',
      icon: false
    };

    render() {
        const {children, icon, label, className, component, ...others} = this.props;
        const cls = classNames({
            'weui-grid': true
        }, className);
        var DefaultComponent = 'a';
        var GridComponent = component ? component : DefaultComponent;

        return (
            <GridComponent className={cls} {...others}>
              {icon ? <GridIcon>{icon}</GridIcon> : false}
              {children}
              {label ? <GridLabel>{label}</GridLabel> : false}
            </GridComponent>
        );
    }
};
