import classNames from "classnames/bind";
import styles from './overviewDetail.module.scss'

import OverViewStatistics from "../overViewStatistic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect,useRef } from "react";


const cx = classNames.bind(styles)

function OverviewDetail({options=[],option,setOption,
    startDate, setStartDate,endDate, setEndDate,
    data,title,
    tableHeads=[]
    }) {
    
    const selectRef  = useRef()

    useEffect(()=>{
        if(option*1===0) selectRef.current.value = option
    },[option])
    return (
        <OverViewStatistics>
            <div className={cx('tool-bar')}>
                <ul>
                    <li>
                        <label>Danh mục thống kê</label>
                        <select ref={selectRef} onChange={(e) =>setOption(e.target.value)}>
                            <option value={0}>Danh mục thống kê</option>
                            {options.map((item, i) => <option key={i} value={item.value}>{item.title}</option>)}
                        </select>
                    </li>
                    <li>
                        <label>Từ ngày</label>
                        <DatePicker 
                            showIcon
                            icon="fa fa-calendar"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            maxDate={endDate}
                        />
                    </li>
                    <li >
                        <label>Đến ngày</label>
                        <DatePicker 
                            showIcon
                            icon="fa fa-calendar"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            minDate={startDate}
                        />
                    </li>
                </ul>
            </div>
            <h1>{title}</h1>
            <table className={cx('table-cotain',{table:true, "table-striped":true})}>
                <thead className="table-primary">
                    <tr>
                        {tableHeads.map((item,index)=><th key={item} scope="col" >{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((items,i)=>{
                        return (
                        <tr key={i}>
                           {items.map((item,index)=><td key={index} >{item}</td>)}
                        </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </OverViewStatistics>
    );
}

export default OverviewDetail;