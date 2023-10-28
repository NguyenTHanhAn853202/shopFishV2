import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Introduction() {
    
    return (
        <div className={cx('wrapper', { wrap: true })}>
            <div className={cx('contain', { grid: true })}>
                {/* <img className={cx('logo')} src={logoImg} alt={'logo'} /> */}
                <div className={cx('info')}>
                    <h3 className={cx('title')}></h3>
                    <h2 className={cx('name-shop')}>Shop cá cảnh</h2>
                    <p className={cx('description')}>
                        Đem đến cho quý khách hàng những dịch vụ tốt nhất, sản phẩm tốt nhất
                    </p>
                    <p className={cx('description')}>
                    Bringing customers the best service, the best products
                    </p>
                    <Link className={cx('link')} to={'gioi-thieu'}>
                        Về chúng tôi
                        <span>
                            <FontAwesomeIcon icon={faRightLong} />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Introduction;
