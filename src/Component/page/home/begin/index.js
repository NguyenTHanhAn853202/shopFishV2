import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import Button from '~/button';
// import { Link } from 'react-router-dom';

import modelImg from '~/media/image/model/anh_ca_homepage.png';

const cx = classNames.bind(styles);

function Begin() {
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-model')}>
                <img className={cx('img')} src={modelImg} alt={'img-model'} />
            </div>
            <div className={cx('contain')}>
                <div className={cx('info')}>
                    <h3 className={cx('title')}>2023 Sản phẩm mới</h3>
                    <h1 className={cx('sale')}>Giảm giá</h1>
                    <h1 className={cx('sale')}>đến 10%</h1>
                    {/* <h2 className={cx('description')}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    </h2> */}
                    
                        <Button ishover to={'/cua-hang'}>Mua Ngay</Button>
                </div>
            </div>
        </div>
    );
}

export default Begin;
