import classNames from "classnames/bind";
import styles from './detailAtStore.module.scss'
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDetailBill } from "~/api-server/bought";
import { useState } from "react";
import { useMemo } from "react";
import { dotMoney } from "../../../utils/dotMoney";

const cx = classNames.bind(styles)

function DetailAtStore() {
    const params = useParams()
    const states = useLocation().state
    const [data,setData] = useState([])
    useEffect(()=>{
        (async()=>{
            const data = await getDetailBill(params.slug)
            if(data.success) {
                setData(data.data)
            }
        })()
    },[params?.slug])
    const pdfRef = useRef()
    const handleExportFile = useReactToPrint({
        content:()=>pdfRef.current,
        // pageStyle:"print"
        // documentTitle:
    })
    const totalCost = useMemo(()=>{
        return data.reduce((first,item)=>first + item.price*item.number,0)
    },[JSON.stringify(data)])
    return (
        <>
            <div className={cx('contain-btn')}>
                <button onClick={handleExportFile} className={cx('btn-export')}> Xuất file</button>
            </div>
            <div className={cx('wrapper',{wrap:true})}> 
                <div ref={pdfRef} className={cx('container')} style={{
                     padding: '50px  30px',
                     width: '60%',
                     position: 'relative',
                     border: '3px solid #333',
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        paddingBottom: '20px'
                    }}>SHOP CÁ CẢNH</h1>
                    <h1 style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        paddingBottom: '20px'
                    }}>Hóa đơn</h1>
                    <h3 style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        padding:'3px'
                    }}>Họ tên: {states.name}</h3>
                    <h3 style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        padding:'3px'
                    }}>SĐT: {states.phoneNumber}</h3>
                    <h3 style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        padding:'3px'
                    }}>Địa chỉ: {states.address} </h3>
                    <h3 style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        padding:'3px'
                    }}>Số hóa đơn: {states.billId}</h3>
                    <table style={{
                         borderCollapse: 'collapse',
                         width: '100%',
                         margin: '30px  auto'
                    }} className={cx('info')}>
                        <thead>
                            <tr style={{
                                textAlign: 'center',
                                border: '1px solid #999',
                            }}>
                                <th style={{
                                    textAlign: 'center',
                                    border: '1px solid #999',
                                }}>STT</th>
                                <th style={{
                                    textAlign: 'center',
                                    border: '1px solid #999',
                                    width:'50%'
                                }} >Tên sản phẩm</th>
                                <th style={{
                                    textAlign: 'center',
                                    border: '1px solid #999',
                                }}>Số lượng</th>
                                <th style={{
                                    textAlign: 'center',
                                    border: '1px solid #999',
                                }}>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                           {data.map((item,index)=>(
                                <tr key ={index} style={{
                                    textAlign: 'center',
                                    border: '1px solid #999',
                                }}>
                                    <td style={{
                                        textAlign: 'center',
                                        border: '1px solid #999',
                                        
                                    }}>{index+1}</td>
                                    <td style={{
                                        textAlign: 'center',
                                        border: '1px solid #999',
                                        width:'50%'
                                    }}>{item.nameProduct}</td>
                                    <td style={{
                                        textAlign: 'center',
                                        border: '1px solid #999',
                                    }}>{item.number}</td>
                                    <td style={{
                                        textAlign: 'center',
                                        border: '1px solid #999',
                                    }}>{dotMoney(item.number*item.price)}VNĐ</td>
                                </tr>
                           ))}
                        </tbody>
                    </table>
                    <div style={{
                        display: 'flex',
                        justifyContent:'end'
                    }} className={cx('pay')}>
                        <table style={{width:'30%'}}>
                            <tbody>
                                <tr>
                                    <td>Tổng tiền: </td>
                                    <td style={{textAlign: 'right'}}>{dotMoney(totalCost)}VNĐ</td>
                                </tr>
                                <tr>
                                    <td>Thành tiền: </td>
                                    <td style={{textAlign: 'right'}}>{dotMoney(totalCost)}VNĐ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div >
                    <h4 style={{
                        textAlign: 'center',
                        fontWeight: '500',
                        paddingTop:'30px'
                    }}>Chúc quý khách có một trải nghiệm tốt</h4>
                </div>
            </div>
        </>
      );
}

export default DetailAtStore;