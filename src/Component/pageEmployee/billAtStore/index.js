import classNames from "classnames/bind";
import styles from './billAtStore.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getBillAtStore } from "~/api-server/bought";

const cx = classNames.bind(styles)

function BillAtStore() {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        (async()=>{
            const data = await getBillAtStore()
            if(data.success) {
                setData(data.data)
            }
        })()
    },[])
    return (
        <div className={cx('wrapper',{wrap:true})}>
            <div className={cx('contain')}>
                <h1>Hóa đơn tại cữa hàng</h1>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã đơn hàng</th>
                            <th>Tên người mua</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Xem chi tiết</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item.billId}</td>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.address}</td>
                                <td>
                                    <span onClick={()=>navigate(`/chi-tiet-hd-tai-ch/${item.billId}`,{state:item})}>Chi tiết</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BillAtStore;