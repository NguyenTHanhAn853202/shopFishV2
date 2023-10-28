import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import img1 from './img_store/PARAKILL-scaled.jpg';
// import img2 from './img_store/Thuốc cho cá AntiStress 5.jpg';
import img3 from './img_store/ca-rong-huyet-long-hellothucung-1.jpg';
import img4 from './img_store/calocnuhoang.png';
import img5 from './img_store/ho-ca-koi-dep-1.jpg';
import img6 from './img_store/image-20200826164105-1.jpeg';
import img7 from './img_store/image14-1603963733-722-width600height400.jpg';
import img8 from './img_store/tetra-color-768x768.jpg';
import img9 from './img_store/thuc-an-cho-ca-betta-thuc-an-kho.jpg';
import img10 from './img_store/thuc-an-vien-dan-luxury-mix-768x768.jpg';


const cx = classNames.bind(styles);

function StoreImage() {
    const imgArr = [
        img1, img3,img4, img5, img6, img7, img8, img9, img10
    ];
    return (
        <div className={cx('wrapper', { wrap: true })}>
            <div className={cx('contain', { grid: true })}>
                {imgArr.map((item, index) => (
                    <div key={index} className={cx('contain-img')}>
                        <img className={cx('img')} src={item} alt="gallery" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StoreImage;
