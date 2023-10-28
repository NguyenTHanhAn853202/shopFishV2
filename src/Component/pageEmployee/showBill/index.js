import classNames from "classnames/bind";
import styles from './showBill.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown, faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect,useState } from "react";
import { showBill, showSpecifyBill } from "~/api-server/bill";
import { Fragment } from "react";


const cx = classNames.bind(styles)

function ShowBill() {
    const [data,setData] = useState([])
    const [check,setCheck] = useState([])
    const newCheck = []

    useEffect(()=>{
        (async()=>{
            const data = await showBill()
            if(data?.success) {
                data.data.forEach((item,index)=>{
                    newCheck.push(false);
                })
                setCheck(newCheck)
                setData(data.data)
            }
        })()
        
    },[])

    const handleShowMore = async(i,billId)=>{
        const data = await showSpecifyBill(billId)
       if(data?.success){
            setCheck(props=>{
                const newProps = [...props]
                newProps[i] = data.data
                return newProps
            })
       }
    }

    
    return (  
        <div className={cx('wrapper')}>
            <h1>Bảng hóa đơn</h1>
            <table>
               <thead>
                    <tr>
                        <th colSpan={1}>STT</th>
                        <th colSpan={2}>Mã HĐ</th>
                        <th colSpan={4}>Nhà cung cấp</th>
                        <th colSpan={2}>Ngày</th>
                    </tr>
               </thead>
               <tbody>
                    {data.map((item, i) =>{

                        return <Fragment key={i}>
                             <tr>
                            <td colSpan={1}>{i+1}</td>
                            <td colSpan={2}>
                                {check[i]?<span onClick={()=>{
                                    setCheck(props=>{
                                        const newProps = [...props]
                                        newProps[i] = false
                                        return newProps
                                    })
                                }} className={cx('icon')}><FontAwesomeIcon icon={faCircleChevronUp} /></span>
                                 :<span onClick={()=>handleShowMore(i,item.billId)} className={cx('icon')} ><FontAwesomeIcon icon={faCircleChevronDown} /></span> }
                                <span>{item.billId}</span>
                            </td>
                            <td colSpan={4}>{item.provider}</td>
                            <td colSpan={2}>{item.date}</td>
                        </tr>
                        {check[i] && <tr>
                            <td colSpan={9}>
                                <table style={{width:'100%'}} border={1}>
                                  <thead>
                                        <tr>
                                            <th colSpan={1}>Mã hàng</th>
                                            <th colSpan={5}>Tên hàng</th>
                                            <th colSpan={1}>Số lượng</th>
                                            <th colSpan={1}>Đơn giá</th>
                                            <th colSpan={1}>Tổng</th>
                                        </tr>
                                  </thead>
                                  <tbody>
                                        {check[i].map((more,index)=>{
                                            return <tr className={cx('more-item')} key={index}>
                                            <td colSpan={1}>{more.itemId}</td>
                                            <td colSpan={5}>{more.name}</td>
                                            <td colSpan={1}>{more.number}</td>
                                            <td colSpan={1}>{more.price}VND</td>
                                            <td colSpan={1}>{more.price*more.number}VND</td>
                                        </tr>
                                        })}
                                  </tbody>
                                </table>
                            </td>
                        </tr>}
                        <tr >
                            <td colSpan={9}>
                            <span className={cx('line')}></span>
                            </td>
                        </tr>
                        </Fragment>
                    })}
               </tbody>
            </table>
        </div>
    );
}

export default ShowBill;