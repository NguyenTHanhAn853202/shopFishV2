import classNames from "classnames/bind";
import styles from './styles.module.scss'
import Button from "~/button";
import NotifyContainer, { notify } from "~/utils/notification";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles)

function Change({title,changeP,show,remove,render}) {
    const {slug=''} = useParams()
   
    const [change, setChange] = useState({
        id:'',
        value:'',
    })
    const [data,setData] = useState([])
    const handleRemove = async(id)=>{
        const data = await remove(id)
        if(data?.success){
            notify('success','Xóa thành công')
            setData(data.data)
        }
    }
    const handleBlur =(e)=>{
        e.target.value = ''
        // setChange({})
    }
    const handleChange =(e,id)=>{
        setChange({
            value: e.target.value,
            id:id,
        })
    }
    const handleReplace = async()=>{
        try {
            if(change?.id && change?.value){
                const data = await changeP(change.id,change.value)
                if(data.success){
                    notify('success', 'Chỉnh sửa thành công')
                    setData(data.data)
                }
                else notify('error', 'Chỉnh sửa thất bại')
            }
            else notify('warning','Chưa nhập thông tin')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(typeof show === 'function'){
            (async()=>{
                const data = await show()
                console.log(show);
                console.log(data);
                setData(data.data)
            })()
        }
    },[typeof show,render,slug,show])

    return (
        <div className={cx('wrapper')}>
            <NotifyContainer />
            <div className={cx('container')}>
               <ul>
                    <h1>{title}</h1>
                    {data.map((item=>{
                        const id = item._id
                        const name = item.name
                        return <li key={id}>
                            <input onChange={(e)=>handleChange(e,id)} onBlur={handleBlur} placeholder={name} />
                            <Button onClick={() =>handleReplace(id)} classNames={cx('btn')} ishover>Sửa</Button>
                            <Button onClick={() =>handleRemove(id)} classNames={cx('btn')} ishover>Xóa</Button>
                        </li>
                    }))}
               </ul>
            </div>
        </div>
    );
}

export default Change;