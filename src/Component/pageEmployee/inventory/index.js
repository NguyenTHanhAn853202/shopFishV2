import classNames from "classnames/bind";
import styles from './inventory.module.scss'
import Table from "../table";
import { useEffect, useState } from "react";
import { showInventory } from "~/api-server/bill";

const cx = classNames.bind(styles)

function Inventory() {
    const [data,setData] = useState([])

    useEffect(()=>{
        (async()=>{
            const data = await showInventory()
            console.log(data.data);
            data.success && setData(data.data)
        })()
    },[])
    return (
        <div className={cx('wrapper')}>
            <h1>Hàng tồn</h1>
            <Table data={data} />
        </div>
    );
}

export default Inventory;