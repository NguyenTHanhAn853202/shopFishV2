import classNames from "classnames/bind";
import styles from './boughtAtStore.module.scss'
import Input from "~/Input";
import { useLocation } from "react-router-dom";
import Button from "~/button";
import { boughtAtStore } from "~/api-server/bought";
import { useState } from "react";
import NotifyContainer, { notify } from "~/utils/notification";

const cx = classNames.bind(styles)

function BoughtAtStore() {
    const location  = useLocation()
    const product = location.state.product
    const [name,setName] = useState('')
    const [address,setAddress] = useState('')
    const [phone,setPhone] = useState('')
    const [number,setNumber] = useState(0)
    const handleBuy = async()=>{
        if(number>product?.number){
            notify('error','Số lượng vượt quá số lượng hiện có')
            return;
        }
        
        const data = await boughtAtStore(product._id,product.name,
            name,phone,address,product.price,number,product.billId,product.itemId)
        if(data.success){
            setName('')
            setAddress('')
            setNumber('')
            setPhone('')
            notify('success','Mua thành công')
        }
    }
    console.log(product);
    return (<div className={cx('wrapper')}>
        <NotifyContainer />
        <h1>Mua tại cữa hàng</h1>
        <div className={cx('product')}>
            <img src={product?.image && product.image[0]} />
            <div className={cx('info-product')}>
                <h4>{product?.name}</h4>
                <span>Giá: {product?.price} VNĐ </span>
                <span>Số lượng hiện có: {product?.number}</span>
            </div>
        </div>
        <div className={cx('buyer')}>
                <label>Số lượng sản phẩm: </label>
                <Input value={number} onChange={(e)=>{setNumber(e.target.value*1)}} type='number' placeholder='Nhập số lượng'/>
                <label>Tên người mua: </label>
                <Input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Nhập tên người mua' />
                <label>Địa chỉ: </label>
                <Input value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder='Nhập địa chỉ' />
                <label>Số điện thoại: </label>
                <Input value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder='Nhập số điện thoại' />
                <Button onClick={handleBuy}>Mua</Button>
            </div>
    </div>);
}

export default BoughtAtStore;