import classNames from "classnames/bind";
import styles from './myOrder.module.scss'
import { useEffect, useMemo, useState } from "react";
import { myOrder } from "~/api-server/showOrder";
import { myBought } from "~/api-server/bought";
import axios from "axios";
import { statusOrder } from "~/api-server/GHN";
import statusDelivery from "./status";
import { dotMoney } from "~/utils/dotMoney";
const cx = classNames.bind(styles)

function MyOrder() {
    const [data,setData] = useState([])
    const [type,setType] = useState(1) // 1 is waiting to confirm and 2 is confirmed
    const [render,setRender] = useState([])
    // const [status,setStatus] = useState('Chờ xác nhận')
    useEffect(()=>{
        (async()=>{
            let data = []
            if(type==1){
                data = await myOrder()
            }
            else data= await myBought()
            setData(data)
        })()
    },[type])
    const handleChangeType = e => {
        setType(e.target.value*1)
    }

   
    const newData = useMemo(()=>{
       if(type===1){
            return data.reduce((first,item,index)=>{
                return [...first,...item?.infoOfOder]
            },[]) 
       }else{
            return data
       }
    },[JSON.stringify(data)])
    useEffect(()=>{
        (async()=>{
            // if(type==1) setStatus('Chờ xác nhận')
            if(type==2){
                const data = newData.map(async(item,index)=>{
                    if(item?.code){
                        const status = await statusOrder(item.code)
                        // console.log(status?.data?.data?.status);
                        const statusStr= statusDelivery(status?.data?.data?.status)
                        item.status = statusStr
                    }
                })
                await Promise.all(data)
                setRender(data)
            }
        })()
    },[newData])
    return <div className={cx('wrapper')}>
        <h1>Đơn hàng của tôi</h1>
        <div className={cx('container')}>
       <div className={cx('contain-select')}>
            <select onChange={handleChangeType}>
                <option value={1}>Đang chờ xác nhận</option>
                <option value={2}>Đã xác nhận</option>
            </select>
       </div>
        <table className={cx('table-item',{table:true})}>
        <thead>
            <tr>
            <th colSpan={1} scope="col">STT</th>
            <th colSpan={2} scope="col">Hình ảnh</th>
            <th colSpan={5} scope="col">Tên sản phẩm</th>
            <th colSpan={2} scope="col">Giá</th>
            <th colSpan={1} scope="col">Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            {newData.map((item,index) =>{
                let status = 'Chờ xác nhận'
                if(item.code ==='success' && type==2){
                    status = 'Đã giao hàng'
                }
                else if(!item.code && type==2) status = 'Đang giao hàng'
                else if(item.code ==='error' && type==2) status = 'Đơn hàng đã hủy'
                else if(type===2 && item?.code){
                    status = item?.status
                }
                return <tr key={index}>
                <th colSpan={1} scope="row">{index+1}</th> 
                    <td colSpan={2}><img style={{width:'100px',objectFit:'cover'}} src={item.image} /></td>
                    <td colSpan={5}>{item.idProduct?.name}</td>
                    <td colSpan={2}>{`${item.number} x ${dotMoney(item.price)} = ${dotMoney(item.price*item.number)} VNĐ`}</td>
                    <td colSpan={1}>{status}</td>
                </tr>
            })}
            
        </tbody>
        </table>
        </div>
    </div>;
}

export default MyOrder;