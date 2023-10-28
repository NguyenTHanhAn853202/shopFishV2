import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import HeaderEachPage from '~/headerEachPage';
import logo from '~/media/image/logo/logocacanh3.png';
import Card from '~/cardIntroduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCoins } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import model from '~/media/image/product/anhcagiothieu.jpg';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Introduct() {
    
    return (
        <div className={cx('wrapper')}>
            <HeaderEachPage title={'giới thiệu'} />
            <div className={cx('contain', { wrap: true })}>
                <div className={cx('contain-grid', { grid: true })}>
                    <div className={cx('contain-logo')}>
                        <div className={cx('logo')}>
                            <img className={cx('logo-img')} src={logo} alt={'logo'} />
                        </div>
                        <p className={cx('title')}>
                        Đam mê của bạn là sự hài lòng của chúng tôi
                        </p>
                    </div>
                    <div className={cx('introduct-product')}>
                        <div className={cx('first-column')}>
                            <div className={cx('card')}>
                                <Card
                                    title={'Miễn phí giao hàng'}
                                    description="Được miễn phi giao hàng tất cả các sản phẩm khi mua."
                                    icon={<FontAwesomeIcon icon={faCoins} />}
                                />
                            </div>
                            <div className={cx('card')}>
                                <Card
                                    title={'Đổi sản phẩm'}
                                    description="Nếu sản phẩm không đúng như hình sẽ được hoàn tiền."
                                    icon={<FontAwesomeIcon icon={faBagShopping} />}
                                />
                            </div>
                        </div>
                        <div className={cx('middle-column')}>
                            <img className={cx('model')} src={model} alt="model" />
                        </div>
                        <div className={cx('end-column')}>
                            <div className={cx('card')}>
                                <Card
                                    title={'Thanh toán an toàn'}
                                    description="Khi mua hàng sẽ đảm tính an ninh, bảo mật khi mua hàng."
                                    icon={<FontAwesomeIcon icon={faPaypal} />}
                                />
                            </div>
                            <div className={cx('card')}>
                                <Card
                                    title={'Danh sách sản phẩm'}
                                    description="Bao gồm tất cả các sản phẩm về cá cảnh."
                                    icon={<FontAwesomeIcon icon={faClipboard} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduct;
