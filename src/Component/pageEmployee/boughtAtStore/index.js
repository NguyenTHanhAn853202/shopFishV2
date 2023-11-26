import classNames from "classnames/bind";
import styles from './boughtAtStore.module.scss'
import Input from "~/Input";
import { useLocation } from "react-router-dom";
import Button from "~/button";
import { boughtAtStore } from "~/api-server/bought";
import { useState } from "react";
import NotifyContainer, { notify } from "~/utils/notification";
import Tippy from "@tippyjs/react/headless";
import useDebounce from "~/utils/useDebounce";
import { useEffect } from "react";
import { search } from "~/api-server/search";
import Render from "~/renderTippy";
import { dotMoney } from "~/utils/dotMoney";

const cx = classNames.bind(styles)

function BoughtAtStore() {
    const location  = useLocation()
    const product = location.state.product
    const [products,setProducts] = useState([product])
    const [key,setKey] = useState('')
    const value  = useDebounce(key,1000)
    const [name,setName] = useState('')
    const [address,setAddress] = useState('')
    const [phone,setPhone] = useState('')
    const [selectProduct,setSelectProduct] = useState([])
    const [number,setNumber] = useState([0])
    const [visibles,setVisibles] = useState(false)
    const [billId,setBillId] = useState('')
   
    const handleBuy = async()=>{
        try {
            if(!products.length){
                notify('error','Vui lòng chọn sản phẩm')
                return;
            }
            if(number.includes(0)){
                notify('error','Vui lòng nhập số lượng')
                return;
            }
            const data = await boughtAtStore(name,phone,address,billId,products,number)
            if(!data.success){
                notify('error',data.message)
                return
            }
            if(data.success){
                setName('')
                setAddress('')
                setNumber([])
                setProducts([])
                setPhone('')
                setBillId('')
                notify('success','Mua thành công')
            }
        } catch (error) {
            // const response = error.response.data
            // notify('error',response.message)
        }
    }

    const handleSelectAdd = (item)=>{
        setProducts([...products,item])
        setNumber([...number,0])
        setVisibles(false)
    }

    const handleChangeNumber = (e,index,currentNumber)=>{
        const ipNumber = e.target.value*1
        
        if(currentNumber*1<ipNumber){
            notify('warning','Vượt quá số lượng hiện có')
            return
        }
        if(ipNumber<0){
            notify('warning','Số lượng lớn hơn 0')
            return
        }
        setNumber(props=>{
            const newProps = [...props]
            newProps[index] = e.target.value *1;
            return newProps
        })
    }

    const handleRemoveItem = (index)=>{
        setNumber(props=>{
            const newProps = [...props]
            newProps.splice(index,1)
            return newProps
        })
        setProducts(props=>{
            const newProps = [...props]
            newProps.splice(index,1)
            return newProps
        })
    }

    useEffect(()=>{
        document.onclick = function(e){
            if(e.target.tagName === 'INPUT'){
                return
            }
            if(!e.target.getAttribute('data-toggle')) setVisibles(false)
        }
    })
    
    useEffect(()=>{
        (async()=>{
            const data = await search(value)
            if(data.success){
                setSelectProduct(data.data)
            }
        })()
    },[value])

    return (<div className={cx('wrapper')}>
        <NotifyContainer />
        <h1>Mua tại cữa hàng</h1>
        <div className={cx('add-product')}>
            <label>Thêm sản phẩm:</label>
            <Tippy
                visible={visibles}
                // hideOnClick={true}
                interactive
                offset={[30, 14]}
                placement="bottom-start"
                interactiveBorder={0}
                render={(attrs) => (
                     <Render classNames={cx('render-tippy')} attrs={attrs}>
                         <div className={cx('list-items')}>
                            <h1>Danh sách sản phẩm</h1>
                            {selectProduct.length?
                            <ul className={cx('list-product')}>
                                {selectProduct.map((item,index) =>{
                                    return <li data-toggle={true} onClick={()=>handleSelectAdd(item)} key={index}>
                                        <img data-toggle={true} src={item?.image && item.image[0]} />
                                        <div data-toggle={true} className={cx('info-product')}>
                                            <h3 data-toggle={true}>{item.name}</h3>
                                            <span data-toggle={true}>SL: {item.number} sản phẩm</span>
                                            <h3 data-toggle={true}>Đơn giá: {dotMoney(item.price)}VNĐ</h3>
                                        </div>
                                    </li>
                                })}
                            </ul>
                            :<h2>Không có sản phẩm nào</h2>}
                         </div>
                    </Render>
                )}
            >
                
                <input onFocus={()=>setVisibles(true)}  onChange={(e)=>setKey(e.target.value)}  />
            </Tippy>
        </div>
        <div className={cx('product')}>
           <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng hiện có</th>
                            <th>Nhập số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((item,index)=>  <tr key={item._id}>
                        <td>{index+1}</td>
                        <td style={{display: 'flex',alignItems: 'center'}}>
                            <img src={item?.image && item.image[0]} />
                        </td>
                        <td>
                            <h4>{item?.name}</h4>
                        </td>
                       
                        <td>
                            <h4>{dotMoney(item?.price)} VNĐ</h4>
                        </td>
                        <td>
                            <h4>{item.number}</h4>
                        </td>
                        <td>
                            <input onChange={(e)=>handleChangeNumber(e,index,item.number)} value={number[index]} type="number" />
                        </td>
                        <td>
                            <button onClick={()=>handleRemoveItem(index)}>X</button>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
          
        </div>
        <div className={cx('buyer')}>
                <label>Mã đơn hàng: </label>
                <Input value={billId} onChange={(e)=>{setBillId(e.target.value)}}  placeholder='Nhập mã hóa đơn'/>
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