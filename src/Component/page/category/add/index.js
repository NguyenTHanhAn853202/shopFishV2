import classNames from "classnames/bind";
import styles from './styles.module.scss'
import Input from "~/Input";
import Button from "~/button";
import { useRef, useState,useContext } from "react";
import { create } from "~/api-server/category";
import { notify } from "~/utils/notification";
import { Context } from "~/GlobalContext";
import { CATEGOTY } from "~/GlobalContext/key";


const cx = classNames.bind(styles)

function Add() {
    const [state,dispatch] = useContext(Context)
    const [value,setValue] = useState('')
    const inputRef = useRef()

    const handleAdd = async() => {
        const data = await create(value)
        if(!data.success){
            notify('error', data.message)
            return;
        }
        setValue('')
        notify('success', data.message)
        inputRef.current.focus()
        dispatch({key:CATEGOTY,value:data.data})
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div>
                    <h1>Thêm Loại Sản Phẩm</h1>
                    <label htmlFor={cx('add-category')}>
                        Nhập danh mục cần thêm:
                    </label>
                    <div className={cx('container-info')}>
                        <Input ref={inputRef} value={value} onChange={(e)=>{setValue(e.target.value)}} id={cx('add-category')} />
                        <Button onClick={handleAdd} classNames={cx('btn')} ishover >Thêm</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;