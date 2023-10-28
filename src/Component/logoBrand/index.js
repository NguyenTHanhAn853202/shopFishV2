import styles from './styles.module.scss';
import classNames from 'classnames/bind';

import img1 from './img_brand/brand_cacanh_nhat.png';
import img2 from './img_brand/brand_logo.png';
import img3 from './img_brand/brand_thuysinh.png';
import img4 from './img_brand/brand_grouppy.jpg';

const cx = classNames.bind(styles);

// function LogoBrand() {
//     const imgArr = [
//         'http://mauweb.monamedia.net/pleatskora/wp-content/uploads/2019/04/logo-brian-orlando-six.png',
//         'http://mauweb.monamedia.net/pleatskora/wp-content/uploads/2019/04/logo-clark-downey.png',
//         'http://mauweb.monamedia.net/pleatskora/wp-content/uploads/2019/04/logo-frk-island.png',
//         'http://mauweb.monamedia.net/pleatskora/wp-content/uploads/2019/04/logo-gilbert-stephany.png',    
//     ];
//     return (
//         <div className={cx('wrapper', { wrap: true })}>
//             <div className={cx('contain', { grid: true })}>
//                 {imgArr.map((item, index) => (
//                     <div key={index} className={cx('contain-img')}>
//                         <img className={cx('img')} src={item} alt="gallery" />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
function LogoBrand() {
    const imgArr = [
        img1, img2, img3, img4
    ];
    return (
        <div className={cx('wrapper', { wrap: true })}>
            <div className={cx('contain', { grid: true })}>
                {imgArr.map((item, index) => (
                    <div key={index} className={cx('contain-img')}>
                        <img className={cx('img')} src={item} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LogoBrand;
