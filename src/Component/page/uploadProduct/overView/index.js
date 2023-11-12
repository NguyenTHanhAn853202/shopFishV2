import styles from './overView.module.scss';
import classNames from 'classnames/bind';
import Input from '~/Input';
import { useEffect, useRef,useContext, useState } from 'react';
import { Context } from '~/GlobalContext';
import { showAddProduect } from '~/api-server/bill';

const cx = classNames.bind(styles);

function OverView({ setOverView,success=false,setSuccess,overView,disable=false,name='' }) {
    // console.log(diasible);
    const optionRef = useRef();
    const productRef = useRef();
    const [data,setData] = useState([])
    const [{category}] = useContext(Context)

    const handleProduct = (e)=>{
        setOverView((props) => {
            return { ...props, name: e.target.value };
        });
    }

    const handleChangeType = (e) => {
        setOverView((props) => {
            return { ...props, type: e.target.value };
        });
    };
    const handleChangeDescription = (e) => {
        setOverView((props) => {
            return { ...props, description: e.target.value };
        });
    };
    useEffect(() => {
        if(success){
            optionRef.current.value = 'default'
            productRef.current.value = 'default'
            setSuccess(false)
        }
    }, [success]);
    useEffect(()=>{
        (async() => {
            const data = await showAddProduect()
            if(data?.success){
                setData(data.data)
            }
        })()
    },[success])
    // useEffect(()=>{
    //     if(Array.isArray(category) && category.length>0){
    //         setOverView((props) => {
    //             return { ...props, type:category[0].type };
    //         });
    //     }
    // },[JSON.stringify(category)])

    return (
        <div className={cx('wrapper')}>
            <select disabled={disable} ref={productRef} className={cx('select-product')}  onChange={handleProduct} >
                {name? <option>{name}</option>: <option value='default'>Chọn sản phẩm</option>}
                {data.map((item,index)=> <option key={index} value={JSON.stringify({...item,index:index})}>
                    {`${item.billId} - ${item._billId.provider} - ${item.itemId} - ${item.name} - số lượng: ${item.recentNumber} - ${item.price}VND`}
                </option>)}
            </select>

            <select ref={optionRef} defaultValue={overView.type} onChange={handleChangeType}>
                <option value='default'>Chọn loại</option>
                {category.map((item,index)=> <option key={item.slug} value={item.slug}>{item.type}</option>)}
            </select>
            <textarea value={overView.description} onChange={handleChangeDescription} placeholder="Mô tả sản phẩm..."></textarea>
        </div>
    );
}

export default OverView;
