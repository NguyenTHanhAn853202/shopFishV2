import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { dotMoney } from '~/utils/dotMoney';

const cx = classNames.bind(styles);

function Card({ src, alt, href,name,cost,...props }) {
    return (
        <Link {...props} to={href}>
            <div className={cx('wrapper')}>
                <div className={cx('contain-img')}>
                    <div className={cx('out-of-stock')}>
                        {/* <h2 className={cx('title')}>HẾT HÀNG</h2> */}
                        {/* <img  src={src} alt={alt} /> */}
                        {src?.includes('.mp4')? <video src={src}></video> :<img className={cx('product-img')} src={src} />}
                    </div>
                </div>
                <div className={cx('info')}>
                    <h4 className={cx('name')}>{name}</h4>
                    <h3 className={cx('price')}>{`${dotMoney(cost)} VNĐ`}</h3>
                </div>
            </div>
        </Link>
    );
}

export default Card;
