import classNames from "classnames/bind";
import styles from './styles.module.scss'
import { Context } from "~/GlobalContext";
import { useContext } from "react";
import Button from "~/button";
import { destroy, replace } from "~/api-server/category";
import NotifyContainer, { notify } from "~/utils/notification";
import { CATEGOTY } from "~/GlobalContext/key";
import { useState } from "react";


const cx = classNames.bind(styles)

function Change() {
    const [{category},dispatch] = useContext(Context);
    const [change, setChange] = useState({
        id:'',
        value:'',
        oldType:''
    })
    const handleRemove = async(id)=>{
        const data = await destroy(id)
        if(data?.success){
            notify('success','Xóa thành công')
            dispatch({key: CATEGOTY,value:data.data})
        }
    }
    const handleBlur =(e)=>{
        e.target.value = ''
        // setChange({})
    }
    const handleChange =(e,id,oldType)=>{
        setChange({
            value: e.target.value,
            id:id,
            oldType:oldType
        })
    }
    const handleReplace = async()=>{
        try {
            if(change?.id && change?.oldType && change?.value){
                const data = await replace(change?.id,change?.value,change?.oldType)
                dispatch({key:CATEGOTY,value:data.data})
                notify('success',data.message)
            }
            else notify('warning','Chưa nhập thông tin')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={cx('wrapper')}>
            <NotifyContainer />
            <div className={cx('container')}>
               <ul>
                    <h1>Danh sách danh mục</h1>
                    {category.map((item=>{
                        const id = item._id
                        const type = item.type
                        return <li key={id}>
                            <input onChange={(e)=>handleChange(e,id,item.slug)} onBlur={handleBlur} placeholder={type} />
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