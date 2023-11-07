import classNames from "classnames/bind";
import styles from './bill.module.scss'
import Button from "~/button";
import { useReducer, useRef, useState } from "react";
import reduce, { CLEARITEM, CLEARPROVIDER, CODEBILL, CODEITEM, DATE, NAME, NUMBER, PRICE, PROVIDER, states } from "./ruducer";
import { useEffect } from "react";
import NotifyContainer, { notify } from "~/utils/notification";
import { create } from "~/api-server/bill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { search, showProductName, showProvider } from "~/api-server/updateInfoQL";
import Tippy from "@tippyjs/react/headless";
import Render from "~/renderTippy";
import './tippy.scss';
import useDebounce from "~/utils/useDebounce";

const cx = classNames.bind(styles)

function Bill() {
    const [state,dispatch] = useReducer(reduce,states)
    const codeBillRef = useRef()
    const [providerAPI,setProviderAPI] = useState([])
    const [productName,setProductName] = useState([])
    const [visible,setVisible] = useState(false)
    const [pName,setPName] = useState('')
    const debounce = useDebounce(pName,500)
    const selectRef = useRef()
    const inputRef = useRef()
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
            selectRef.current.value='default'
            inputRef.current.value=''
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

    useEffect(()=>{
        (async()=>{
            const [provider,productName ]  =await Promise.all([showProvider(),showProductName()])
            if(provider.success){
                setProviderAPI(provider.data)
            }
            if(productName.success){
                setProductName(productName.data)
            }

        })() 
    },[])

    useEffect(()=>{
        (async()=>{
            const data = await search(debounce)
            if(data?.success){
                setProductName(data.data)
            }
        })()
    },[debounce])

    useEffect(()=>{
        window.onclick =function(e){
            if(!e.target.getAttribute('data-hidden')) setVisible(false)
        }
    })

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
                    <label>Chọn nhà cung cấp:</label>
                    <select ref={selectRef} onChange={(e)=>{dispatch({key:PROVIDER,value:e.target.value})}}>
                        <option value={'default'}>Nhà cung cấp</option>
                        {providerAPI.map((item,index)=><option key={index} value={item.name}>{item.name}</option>)}
                    </select>
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
                    <Tippy
                        visible={visible}
                        interactive={true}
                        offset={[30, 14]}
                        placement="bottom-start"
                        interactiveBorder={0}
                        render={(attrs)=><Render data-hidden={1} classNames={cx('tippy')} attrs={attrs}>
                            <ul>
                                {productName.length 
                                ?productName.map((item,index)=><li 
                                onClick={()=>{
                                    dispatch({key:NAME,value:item.name})
                                    setPName(item.name)
                                    setVisible(false)
                                }} 
                                key={item._id}>{item.name}</li>)
                                :<li className={cx('no-see')}>Không tìm thấy</li>}
                            </ul>
                        </Render>}
                    >
                        <input ref={inputRef} data-hidden={1} value={pName} onChange={(e)=>setPName(e.target.value)}
                         onFocus={()=>{setVisible(true)}}  
                        placeholder="Nhập mã hàng" />
                    </Tippy>
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