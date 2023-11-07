import styles from './type.module.scss';
import classNames from 'classnames/bind';
import Input from '~/Input';
import { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Type({ index,success=false ,setSuccess,location}, ref) {
    const imgRef = useRef();
    const sizeRef = useRef();
    const colorRef = useRef();
    const priceRef = useRef();
    const product = location.state?.product
    const numberRef = useRef();
    const [info,setInfo] = useState({size:product?.size||'',number:product?.number||"",price:product?.price||""});
    const [file, setFile] = useState([]);
    const [fileUpdate,setFileUpdate] = useState(product?.image||[])


    const handlChangeImage = (e) => {
        const fileImg = e.target.files
        setFile(props=>[...props,...fileImg])
    };

    const handleDelete = (index) => {
        setFile(props=>{
            const newData = [...props]
            newData.splice(index, 1)
            return newData
        })
    }
    const  handleDeleteFileUpdate = (index) => {
        setFileUpdate(props=>{
            const newData = [...props]
            newData.splice(index, 1)
            return newData
        })
    }
    useImperativeHandle(ref, () => ({
        info() {
            return {
                size: sizeRef.current.value.split(' '),
                price: priceRef.current.value * 1,
                // number: numberRef.current.value * 1,
                file:file,
                fileUpdate:fileUpdate
            };
        },
    }));

    useEffect(()=>{
        if(success){
            priceRef.current.value =''
            sizeRef.current.value=''
            setInfo({size:'',number:"",price:""})
            setFile([])
            setFileUpdate([])
            setSuccess(false)
        }
    },[success])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('input')}>
                <Input onChange={(e)=>setInfo((prop=>({...prop,price:e.target.value*1})))} value={info.price} ref={priceRef} w70 type="number" min={1} className={cx('price')} placeholder="Giá" />
                <Input onChange={(e)=>setInfo((prop=>({...prop,size:e.target.value})))} value={info.size} ref={sizeRef} w70  className={cx('price')} placeholder="Size" />
            </div>
            <div className={cx('image')}>
                <div className={cx('contain-image')}>
                    {fileUpdate.map((item,index)=>{
                        return <div className={cx('item-image')} key={item+index}>
                        <button onClick={()=>handleDeleteFileUpdate(index)}><FontAwesomeIcon icon={faTimesCircle} /></button> 
                        {item?.includes('.mp4')?<video src={item} />:<img  src={item} />}
                    </div>
                    })} {file.map((imgItem,index) =>{
                        return <div className={cx('item-image')} key={imgItem.lastModified + imgItem.lastModifiedDate+index}>
                            <button onClick={()=>handleDelete(index)}><FontAwesomeIcon icon={faTimesCircle} /></button> 
                            {imgItem.name?.includes('.mp4')?<video src={URL.createObjectURL(imgItem)} />:<img  src={URL.createObjectURL(imgItem)} />}
                        </div>
                    })}
                </div>
            
                <input
                    style={{ display: 'none' }}
                    index={index}
                    onChange={handlChangeImage}
                    id={cx(`file-upload-${index}`)}
                    type="file" 
                    accept='.jpg, .png, .mp4'
                    multiple
                />
                <label htmlFor={cx(`file-upload-${index}`)}>Thêm ảnh</label>
            </div>
        </div>
    );
}

export default forwardRef(Type);
