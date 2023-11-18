import classNames from "classnames/bind"
import styles from './overViewStatistic.module.scss'
import CartInfo from "./cartInfo";
import { useEffect } from "react";
import { overview } from "~/api-server/statistics";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faCubes, faDollarSign, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles)

function OverViewStatistics({children}) {
    const [data,setData] = useState({})
    
    useEffect(()=>{
        (async()=>{
            const data = await overview()
            setData(data)
        })()
    },[])
    return <div className={cx('wrapper',{wrap:true})}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <CartInfo className={cx('cart-info')}  link={'/thong-ke'} info={data?.totalSales +' đ'} title='Tổng doanh thu' Icon={<FontAwesomeIcon icon={faDollarSign} />} />
                    <CartInfo className={cx('cart-info')} link={'/thong-ke-khach-hang'} blue info={data?.userNumber} title='Tổng khách hàng' Icon={<FontAwesomeIcon icon={faUser} />} />
                    <CartInfo className={cx('cart-info')} link={'/thong-ke-san-pham'} green info={data?.itemNumber} title='Sản phẩm bán ra' Icon={<FontAwesomeIcon icon={faCube} />} />
                    <CartInfo className={cx('cart-info')} link={'/thong-ke-don-hang'} gold info={data?.orderNumber} title='Số đơn hàng' Icon={<FontAwesomeIcon icon={faCubes} />} />
                    <CartInfo className={cx('cart-info')} link={'/thong-ke-nha-cung-cap'} violet info={data?.providerNumber} title='Tổng nhà cung cấp' Icon={<FontAwesomeIcon icon={faUserTie} />} />
                </div>
                {children}
            </div>
        </div>;
}

export default OverViewStatistics;

// Tổng doanh thu, tổng sản phẩm bán ra, Tổng lượng khách hàng, Tổng số đơn hàng, Tổng nhà cung cấp