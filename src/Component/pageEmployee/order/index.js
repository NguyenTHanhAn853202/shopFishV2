import { useState } from "react";
import OverviewDetail from "../overviewDetail";
import { order } from "~/api-server/statistics";
import { useEffect } from "react";
import { useMemo } from "react";
import { dotMoney } from "~/utils/dotMoney";

const options = [
    {
        title:'Số lượng tăng dần',
        value:2
    },
    {
        title:'Số lượng giảm dần',
        value:1
    },
    {
        title:'Giá trị giảm dần',
        value:3
    }
]

const title =' Thống kê theo đơn hàng'

const tableHeads = ['STT','ID hóa đơn','Tên người mua','Tên sản phẩm','Số lượng','Đơn giá(VND)']

function Order() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [option,setOption] = useState(0)
    const [data,setData] = useState([])

    useEffect(()=>{
        (async()=>{
            try {
                const data = await order(startDate,endDate,option)
                if(data?.success) {
                    setData(data.data)
                }
            } catch (error) {
                console.log(error.message);
            }
        })()
    },[startDate,endDate,option])
    console.log(data);

    const newData = useMemo(()=>{
        return data.reduce((first,item,index)=>{

            return item?.nameProduct?
            [...first,[index+1,item._id,item.name,item.nameProduct,item.number,dotMoney(item.price)]]
            :[...first,[index+1,item._id,item.userID.name,item.idProduct.name,item.number,dotMoney(item.price)]]
        },[])
    },[JSON.stringify(data)])
    console.log(newData);
    return (
        <OverviewDetail
            options={options}
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            option={option}
            setOption={setOption}
            title={title}
            tableHeads={tableHeads}
            data={newData}
        >

        </OverviewDetail>
    );
}

export default Order;