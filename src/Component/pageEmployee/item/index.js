import classNames from "classnames/bind";
import styles from './item.module.scss'
import OverviewDetail from "../overviewDetail";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { item } from "~/api-server/statistics";
import { dotMoney } from "~/utils/dotMoney";


const  cx = classNames.bind(styles)
const options = [
    {
        title:'Bán nhiều nhất',
        value:1
    },
    {
        title:"Bán ít nhất",
        value:2
    },
    {
        title:"Doanh thu cao nhất",
        value:3
    }
]
const title = 'Thống kê theo sản phẩm'
const tableHeads = ['STT','ID','Nhà cung cấp','Tên sản phẩm', 'Số lượng','Đơn giá(VND)']

function Item() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [option,setOption] = useState(0)
    const [data,setData] = useState([])
    const [search,setSearch] = useState('')
    useEffect(()=>{
        (async()=>{
            const data = await item(startDate,endDate,option,search)
            if(data.success) {
                setData(data.data)
            }
        })()
    },[startDate,endDate,option,search])

    const newData = useMemo(()=>{
        return data.reduce((first,item,index)=>{
            const detail = item._billId
            return [...first,[index+1,item?._id,detail.provider,item.name,item.number,dotMoney(item.price)]]
        },[])
    },[JSON.stringify(data)])



    return (
        <OverviewDetail
            setOption={setOption} 
            option={option} 
            options={options} 
            startDate={startDate} 
            endDate={endDate} 
            setStartDate={setStartDate} 
            setEndDate={setEndDate}
            data={newData}
            title={title}
            tableHeads={tableHeads}
            search={search}
            setSearch={setSearch}
        >
            
        </OverviewDetail>
    );
}

export default Item;