import classNames from "classnames/bind";
import styles from './styles.module.scss'
import Add from "./add";
import Change from "./change";

const cx = classNames.bind(styles)

function Category() {
    return ( <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <Add />
            <div className={cx('wall')}><span></span></div>
            <Change />
        </div>
    </div>);
}

export default Category;