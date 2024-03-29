import classNames from "classnames/bind";
import styles from './user.module.scss'
import OverviewDetail from "../overviewDetail";
import { useEffect, useMemo, useState } from "react";
import { user } from "~/api-server/statistics";
import { dotMoney } from "~/utils/dotMoney";

const cx = classNames.bind(styles)

const options = [
    {
        title:'Khách hàng tiềm năng',
        value:1
    }
]

const title='Thống kê khách hàng'


function User() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [option,setOption] = useState(0)
    const [data,setData] = useState([])
    const [tableHeads,setTableHeads] = useState([])
    const [search,setSearch] = useState('')

    useEffect(()=>{
        (async()=>{
            const data = await user(startDate,endDate,option,search)
            if(data.success){
                setData(data.data)
            }
            if(search && option !=1) setTableHeads(['STT','ID','Tên đăng nhập','Tên khách hàng','Tổng tiền(VND)'])
            else if(option*1===1){
                setTableHeads(['STT','ID','Tên đăng nhập','Tên khách hàng','Tổng tiền(VND)'])
            }
            else{
                setTableHeads(['STT','ID','Tên đăng nhập','Tên khách hàng'])
            }
        })()
    },[startDate,endDate,option,search])

    console.log(data);

    const newData = useMemo(()=>{
        return data.reduce((first,item,index)=>{
            if(item.detail){
                const detail = item.detail[0]
                return [...first,[index+1,item._id,detail.userName,detail.name,dotMoney(item.cost)]]
            }
            return [...first,[index+1,item._id,item.userName,item.name]]
            
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
            title={title}
            tableHeads={tableHeads}
            data={newData}
            search={search}
            setSearch={setSearch}
        >
            
        </OverviewDetail>
    );
}

export default User;