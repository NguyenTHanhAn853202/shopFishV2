import { useEffect } from "react";
import OverviewDetail from "../overviewDetail";
import { provider } from "~/api-server/statistics";
import { useMemo } from "react";
import { useState } from "react";

const title = 'Thống kê nhà cung cấp'

const options = [
    {
        title: 'Nhà cung cấp tiềm năng',
        value:1
    }
]

let tableHeads = ['STT','ID','Tên nhà cung cấp']

function Provider() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [option,setOption] = useState(0)
    const [data,setData] = useState([])
    const [search,setSearch] = useState('')

    useEffect(()=>{
        (async()=>{
            const data = await provider(startDate,endDate,option,search)
            if(data.success) {
                setData(data.data)
            }
            if(option==1){
                tableHeads = ['STT','ID','Tên nhà cung cấp','Số lần nhập hàng']
            }
            else{
                tableHeads = ['STT','ID','Tên nhà cung cấp']
            }
        })()
    },[startDate,endDate,option,search])

    const newData = useMemo(()=>{
        return data.reduce((first,item,index)=>{
            if(item.detail){
                const detail = item.detail[0]
                return [...first,[index+1,detail._id,item._id,item.count]]
            }
            return [...first,[index+1,item._id,item.name]]
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

export default Provider;