import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import HeaderEachPage from '~/headerEachPage';
import StoreImage from '~/Component/storeImage';

const cx = classNames.bind(styles);

function Collection() {
    
    return (
        <div className={cx('wrapper')}>
            <HeaderEachPage title="Mặt hàng" />
            <div className={cx('contain')}>
                <h1 className={cx('title')}>Mặt hàng</h1>
                <StoreImage />
            </div>
        </div>
    );
}

export default Collection;
