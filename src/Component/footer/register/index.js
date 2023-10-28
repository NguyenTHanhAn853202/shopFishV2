import styles from './styles.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>NHẬN PHIẾU GIẢM GIÁ 20%</h1>
            <p className={cx('description')}>
                
            </p>
            <div className={cx('contain-input')}>
                <input className={cx('input')} type="text" placeholder='Email ...'/>
                <button className={cx('btn')}>Đăng kí</button>
            </div>
        </div>
    );
}

export default Register;
