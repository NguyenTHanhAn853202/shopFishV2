import classNames from "classnames/bind";
import styles from './styles.module.scss'
import Input from "~/Input";
import Button from "~/button";
import { useRef, useState } from "react";
import { notify } from "~/utils/notification";


const cx = classNames.bind(styles)

function Add({title,create,setRender}) {
    const [value,setValue] = useState('')
    const inputRef = useRef()

    const handleAdd = async() => {
        const data = await create(value)
        if(!data.success){
            notify('error', 'cập nhật thất bại')
            return;
        }
        setValue('')
        setRender(props=>!props)
        notify('success', 'Thành công')
        inputRef.current.focus()
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div>
                    <h1>{title}</h1>
                    <label htmlFor={cx('add-category')}>
                        Nhập thông tin cần thêm:
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