import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import Card from '../../../../cardIntroduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCoins } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);

function Benefit() {
    
    return (
        <div className={cx('wrapper', { wrap: true })}>
            <div className={cx('contain', { grid: true })}>
                <div className={cx('card')}>
                    <Card
                        title={'Miễn phí giao hàng'}
                        description="Được miễn phi giao hàng tất cả các sản phẩm khi mua"
                        icon={<FontAwesomeIcon icon={faCoins} />}
                        isIcon={true}
                    />
                </div>
                <div className={cx('card')}>
                    <Card
                        isIcon={true}
                        title={'Đổi sản phẩm'}
                        description="Khi mua hàng tại đây, nếu sản phẩm không đúng như hình và video sẽ được đổi hoàn tiền"
                        icon={<FontAwesomeIcon icon={faBagShopping} />}
                    />
                </div>
                <div className={cx('card')}>
                    <Card
                        title={'Thanh toán an toàn'}
                        description="Khi mua hàng sẽ đảm tính an ninh, bảo mật khi mua hàng"
                        icon={<FontAwesomeIcon icon={faPaypal} />}
                        isIcon={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Benefit;
