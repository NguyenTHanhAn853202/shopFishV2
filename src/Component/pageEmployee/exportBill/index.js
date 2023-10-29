import classNames from "classnames/bind";
import styles from './exportBill.module.scss'
import Table from "../table";
import { useState } from "react";
import { useEffect } from "react";
import { showExportBill } from "~/api-server/bill";


const cx = classNames.bind(styles)

function ExportBill() {
    const [data,setData ] = useState([])
    useEffect(()=>{
        (async()=>{
            const data = await showExportBill()
            data.success && setData(data.data)
        })()
    },[])
    return (
        <div className={cx('wrapper')}>
            <h1>Hóa đơn xuất</h1>
            <Table data={data} />
        </div>
    );
}

export default ExportBill;