import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import Contain from '~/contain';
const cx = classNames.bind(styles);

function Render({ children,classRender, classNames, attrs, isNotPadding,...props }) {
    return (
        <div {...props} className={cx('box-search',{[classRender]:classRender})} tabIndex="-1" {...attrs}>
            <div className={cx('contain-bag', { [classNames]: classNames })}>
                <Contain isNotPadding={isNotPadding}>{children}</Contain>
            </div>
        </div>
    );
}

export default Render;
