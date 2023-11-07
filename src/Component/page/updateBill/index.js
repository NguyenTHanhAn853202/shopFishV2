import classNames from "classnames/bind";
import styles from './styles.module.scss'
import Add from "./add";
import Change from "./change";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { changeProductName, changeProvider, 
    createProductName, createProvider, removeProductName, 
    removeProvider, showProductName, showProvider } 
from "~/api-server/updateInfoQL";

const cx = classNames.bind(styles)

function UpdateBill() {
    const {slug=''} = useParams()
    const [info,setInfo ] = useState({})
    const [render,setRender] = useState(false)

    useEffect(()=>{
        if(slug==='nha-cung-cap'){
            setInfo({
                titleAdd:'Thêm nhà cung cấp',
                titleChange:'Danh sách nhà cung cấp',
                create:createProvider,
                change:changeProvider,
                show:showProvider,
                remove:removeProvider
            })
        }
        else if(slug==='ten-san-pham'){
            setInfo({
                titleAdd:'Thêm nhà tên sản phẩm',
                titleChange:'Danh sách tên sản phẩm',
                create:createProductName,
                change:changeProductName,
                show:showProductName,
                remove:removeProductName
            })
        }
    },[slug])
    return ( <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <Add setRender={setRender} title={info.titleAdd} create={info.create} />
            <div className={cx('wall')}><span></span></div>
            <Change 
                changeP={info.change} 
                title={info.titleChange} 
                show={info.show}
                remove={info.remove}
                render={render}
            />
        </div>
    </div>);
}

export default UpdateBill;