import classNames from "classnames/bind";
import styles from './bill.module.scss'
import Button from "~/button";
import { useReducer, useRef } from "react";
import reduce, { CLEARITEM, CLEARPROVIDER, CODEBILL, CODEITEM, DATE, NAME, NUMBER, PRICE, PROVIDER, states } from "./ruducer";
import { useEffect } from "react";
import NotifyContainer, { notify } from "~/utils/notification";
import { create } from "~/api-server/bill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function Bill() {
    const [state,dispatch] = useReducer(reduce,states)
    const codeBillRef = useRef()
    const {
        codeBill,
        provider, 
        date,
        codeItem,
        name,
        number,
        price
    } = state
    const handleSendRequest = async()=>{
        if(!codeBill || !codeItem ||!provider || !name || !number || !price){
            notify('error','Không đủ thông tin cần thiết')
            return
        }
        const data = await create(codeBill,provider,date,codeItem,name,number,price)
        if(data.success){
            notify('success','Tạo thành công')
            dispatch({key:CLEARITEM,value:''})
            codeBillRef.current.focus()
            return
        } 
        if(data?.code === 11000){
            notify('error','Mã đơn hàng đã tồn tại')
            codeBillRef.current.focus()
            return  
        }
        notify('error','Không tạo được hóa đơn, xin thử lại')

    }

    return (
    <div className={cx('wrapper')}>
        <NotifyContainer />
        <div className={cx('contain')}>
            <h1>Cập nhật hóa đơn</h1>
            <h1>Nhà cung cấp</h1>
            <div className={cx('provider')}>
                <div className={cx('contain-ip', 'code')}>
                    <label>Mã hóa đơn:</label>
                    <input ref={codeBillRef} onChange={(e)=>{dispatch({key:CODEBILL,value:e.target.value})}} value={codeBill} placeholder="Nhập mã hóa đơn" />
                </div>
               <div className={cx('contain-ip')}>
                    <label>Nhà cung cấp:</label>
                    <input onChange={(e)=>{dispatch({key:PROVIDER,value:e.target.value})}} value={provider} placeholder="Nhập nhà cung cấp" />
               </div>
               <div className={cx('contain-ip','date')}>
                    <label>Ngày nhập:</label>
                    <input onChange={(e)=>{dispatch({key:DATE,value:e.target.value})}} value={date} type="date"  placeholder="Nhập ngày nhập" />
               </div>
               <span onClick={(e)=>{dispatch({key:CLEARPROVIDER,value:''})}} className={cx('clear')}><FontAwesomeIcon icon={faXmarkCircle} /></span>
            </div>   
            <h1>Sản phẩm </h1>
            <div className={cx('item')}>
                <div className={cx('contain-ip' ,'code')}>
                    <label>Mã hàng:</label>
                    <input onChange={(e)=>{dispatch({key:CODEITEM,value:e.target.value})}} value={codeItem} placeholder="Nhập mã hàng" />
                </div>
               <div className={cx('contain-ip','name')}>
                    <label>Tên hàng:</label>
                    <input onChange={(e)=>{dispatch({key:NAME,value:e.target.value})}} value={name} placeholder="Nhập tên hàng" />
               </div>
               <div className={cx('contain-ip')}>
                    <label>Số lượng:</label>
                    <input type="number" onChange={(e)=>{dispatch({key:NUMBER,value:e.target.value})}} value={number} placeholder="Nhập số lượng" />
               </div>
                <div className={cx('contain-ip','price')}>
                    <label>Đơn giá:</label>
                    <input type="number" onChange={(e)=>{dispatch({key:PRICE,value:e.target.value})}} value={price}  placeholder="Nhập đơn giá" />
                    <span>VND</span>
                </div>
            </div>
            <Button onClick={handleSendRequest}>Xác nhận</Button>
        </div>
    </div>
    );
}

export default Bill;