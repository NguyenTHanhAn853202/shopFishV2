import classNames from "classnames/bind";
import styles from './statistic.module.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { statistic } from "~/api-server/bought";
import OverViewStatistics from "../overViewStatistic";
import { saleInYear } from "~/api-server/statistics";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê',
      },
    },
  };
  const optionYears = {
    esponsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê theo năm',
      },
    },
  }

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September', 'October', 'November', 'December'];



const  cx = classNames.bind(styles)

function Statistic() {
  const [data,setData] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [storeData,setStoreData] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [total,setTotal] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [years,setYears] = useState([0,0,0,0,0])
  const [year,setYear] = useState(new Date())
  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Online',
        data: data,
        backgroundColor: ['rgba(255, 99, 132, 0.8)'
      ]
      },
      {
        label: 'Tại cửa hàng',
        data: storeData,
        backgroundColor: [
        'rgba(243, 241, 23, 0.8)'
      ]
      },{
        label: 'Tổng',
        data: total,
        backgroundColor: [
        'rgba(153, 102, 255, 0.8)',
      ]
      }
    ],
  };
  const nowDate = new Date().getFullYear();
  console.log(`${nowDate-4}`);
  const dataChartYears = {
    labels:[`${nowDate-4}`,`${nowDate-3}`,`${nowDate-2}`,`${nowDate-1}`,`${nowDate}`],
    datasets: [
      {
        label: 'Tổng',
        data: years,
        backgroundColor: ['rgba(255, 99, 132, 0.8)']
      }
    ],
  }

  useEffect(()=>{
    (async()=>{
      const data = await saleInYear()
      if(data.success){
          const arr = []
          for(let key in data.data){
            arr.push(data.data[key])
          }
          setYears([...arr])
      }
    })()
  },[])


  useEffect(()=>{
    (async()=>{
      const data = await statistic(new Date(year).getFullYear())
      if(data.success) {
        const dataMonth = data.data
        let newData = []
        let newDataStore = []
        for(const key in dataMonth[0]){
          newData.push(dataMonth[0][key])
        }
        for(const key in dataMonth[1]){
          newDataStore.push(dataMonth[1][key])
        }
        let dataTotal = []
        for(let i = 0; i<newData.length; i++){
          dataTotal.push(newData[i]+newDataStore[i])
        }
        setData(newData)
        setStoreData(newDataStore)
        setTotal(dataTotal)
      }
    })()
  },[year])
  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };
    return <OverViewStatistics>
      <div className={cx('wrapper')}>
        <div className={cx('date-picker')}>
            <label>Chọn năm: </label>
            <DatePicker 
              selected={year}
              renderYearContent={renderYearContent}
              showYearPicker
              onChange={(data) =>setYear(data)}
              dateFormat="yyyy"
            />
        </div>
         <Bar options={options} data={dataChart} />
         
         <div className={cx('chart-year')}><Bar options={optionYears} data={dataChartYears} /></div>

      </div>
    </OverViewStatistics>
}

export default Statistic;

