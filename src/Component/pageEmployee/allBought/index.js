import classNames from "classnames/bind";
import styles from './allBought.module.scss'
import Button from "~/button";
import { useEffect, useState } from "react";
import { allBought, updateStatus } from "~/api-server/bought";
import { dotMoney } from "~/utils/dotMoney";

const cx = classNames.bind(styles)

function AllBought() {
    const [data,setData] = useState([])

    useEffect(()=>{
        (async()=>{
            const bought = await allBought()
            if(bought.success) {
                setData(bought.data)
                
            }
        })()
    },[JSON.stringify(data)])
    const handleSuccess = async(item,id,i)=>{
        try {
            const data = await updateStatus(id,'success',item.idProduct.billId,item.idProduct.itemId,item.number,item.idProduct.price,item.idProduct?.name)
            if(data.success){
                setData(props=>{
                    const newData = [...props]
                    newData.splice(i,1)
                    return [...newData] 
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleError = async(id,i)=>{
        try {
            const data = await updateStatus(id,'error')
            if(data.success){
                setData(props=>{
                    const newData = [...props]
                    newData.splice(i,1)
                    return [...newData]
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (<div className={cx('wrapper')}>
        <h1>Danh Sách Trạng Thái</h1>
        <ul>
           {data.map((item,index) =>{
                 return <li key={item._id}>
                 <h2 className={cx('name')}>{item.userID.name + " - " + item.userID._id}</h2>
                 <div className={cx('product')}>
                     <img src={item.idProduct?.image[0]} />
                     <div className={cx('info-product')}>
                         <h3>{item.idProduct?.name}</h3>
                         <h4>{'Size: '  + item.size}</h4>
                         <span>{item.price + ' x ' + item.number +' = ' + dotMoney(item.price*item.number)+'VNĐ'}</span>
                     </div>
                     <div>
                         <Button ishover onClick={()=>handleSuccess(item,item._id,index)}>Thành Công</Button>
                         <Button ishover onClick = {()=>handleError(item._id,index)}>Hủy</Button>
                     </div>
                 </div>
                
             </li>
           })}
        </ul>
    </div>);
}

export default AllBought;