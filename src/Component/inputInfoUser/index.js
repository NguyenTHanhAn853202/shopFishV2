import classNames from "classnames/bind";
import styles from './inputInfoUser.module.scss';
import { useEffect, useState } from "react";
import { getDistrict, getProvince, getVillage } from "~/api-server/GHN";

const cx = classNames.bind(styles)

function InputInfoUser({address,setAddress,setAddressName}) {
    const [province,setProvince] = useState([])
    const [district,setDistrict] = useState([])
    const [village,setVillage] = useState([])
    // const [address,setAddress] = useState({
    //     province:'',
    //     district:'',
    //     village:''
    // })

    const handleChangeProvince = (e)=>{
        const element = e.target.value.split(' ')
        const province = element[0]*1
        element.shift()
        setAddressName(element.join(' '))
        setAddress((props)=>{
            return{...props,province:province}
        })
    }

    const handleChangeDistrict = (e)=>{
        const element = e.target.value.split(' ')
        const district = element[0]*1
        element.shift()
        setAddressName(props=>{
            
            return element.join(' ')+ ' - ' + props
        })
        setAddress((props)=>{
            return {...props,district:district}
        })
    }

    const handleChangeVillage = (e)=>{
        const element = e.target.value.split(' ')
        const village = element[0]
        element.shift()
        setAddressName(props=>{
            return element.join(' ')+ ' - ' + props
        })
        setAddress((props)=>{
            return {...props,village:village}
        })
    }
    

    useEffect(()=>{
        (async()=>{
            const dataProvince = await getProvince()
            setProvince(dataProvince)
            if(address?.province){
                const dataDistrict = await getDistrict(address?.province)
                setDistrict(dataDistrict)

                if(address?.district){
                    const dataVillage = await getVillage(address?.district)
                    setVillage(dataVillage)
                }
            }
            
        })()
    },[JSON.stringify(address)])
    return (<div className={cx('wrapper')}>
        <h4>Địa chỉ</h4>
        <select className={cx('province')} onChange={handleChangeProvince}>
            <option >Chọn tỉnh thành</option>
            {province.map((item,index) => {
                return <option value={`${item.ProvinceID} ${item.NameExtension[1]}`} key={index}>{item.NameExtension[1]}</option>
            })}
        </select>
        <select className={cx('district')} onChange={handleChangeDistrict} disabled={!address?.province}>
            <option>Chọn Huyện</option>
            {district.map((item,index)=>{
                return <option key={index} value={`${item.DistrictID} ${item.DistrictName}`}>{item.DistrictName}</option>
            })}
        </select>
        <select className={cx('village')} onChange={handleChangeVillage}  disabled={!address?.district}>
            <option >Chọn Xã</option>
            {village.map((item, index) =>{
                return <option key={index} value={`${item.WardCode} ${item.WardName}`}>{item.WardName}</option>
            })}
        </select>
    </div>);
}

export default InputInfoUser;