import classNames from "classnames/bind";
import styles from './cartInfo.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function CartInfo({Icon,title,info,link,className,blue,green,violet,gold}) {
    return (
        <div  className={cx('wrapper',{[className]:className,blue,green,violet,gold})}>
            <div className={cx('contain-info')}>
                <span className={cx('icon')}>{Icon}</span>
                <div className={cx('right-contain-info')}>
                    <h2>{info}</h2>
                    <h4 className={cx('title')}>{title}</h4>
                </div>
            </div>
            <div className={cx('footer')}>
                <Link to={link}>Xem chi tiết</Link>
                <span><FontAwesomeIcon icon={faEye} /></span>
            </div>
        </div>
    );
}

export default CartInfo;