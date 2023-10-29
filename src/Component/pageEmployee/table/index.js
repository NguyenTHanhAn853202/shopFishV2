import classNames from "classnames/bind";
import styles from './table.module.scss'

const cx = classNames.bind(styles)

function Table({data}) {
    return (
    <table className={cx('table')} >
        <thead>
            <tr>
                <th >STT</th>
                <th >Nhà cung cấp</th>
                <th >Mã Hàng</th>
                <th >Tên hàng</th>
                <th >Số lượng</th>
            </tr>
        </thead>
        <tbody>
           {data.map((item,index)=>{
                console.log(item);
                return  <tr key={index}>
                <td >{index+1}</td>
                <td >{item._billId.provider}</td>
                <td >{item.itemId}</td>
                <td >{item._itemId.name}</td>
                <td >{item.number}</td>
            </tr>
           })}
        </tbody>
    </table>
    );
}

export default Table;