import classNames from 'classnames/bind';
import styles from './card.module.scss';
import Button from '~/button';
import { createRef, useEffect, useRef, useState } from 'react';
import { confirm } from '~/api-server/showOrder';
import { createItem, getDistrict } from '~/api-server/GHN';
import { dotMoney } from '~/utils/dotMoney';

const cx = classNames.bind(styles);

function Card({ user, order, idOrder,item,setRender }) {
    const { name, avatar } = user;
    const [products, setProducts] = useState(order);

    const weightRef = useRef([])
    const heightRef = useRef([])
    const widthRef = useRef([])
    const lengthRef = useRef([])



    const handleClickConfirm = async (itemProduct, i,item) => {
        if (products.length > 0 && weightRef[i].current.value !=='' && heightRef[i].current.value !==''
            && widthRef[i].current.value !=='' && lengthRef[i].current.value !==''
        ) {
            
            const data = await createItem(item.toName,item.toPhoneNumber,item.toSpecificAddress,item.toVillage,item.toDistrict
                ,itemProduct.price*itemProduct.number,weightRef[i].current.value*1,lengthRef[i].current.value*1,widthRef[i].current.value*1,
                   heightRef[i].current.value*1,itemProduct.number,itemProduct.idProduct.name,itemProduct.price
                )
            if(data?.data?.code ===200){
                const orderCode = data.data.data.order_code
                const dataConfirm = await confirm(idOrder, itemProduct._id,orderCode,itemProduct.idProduct.billId,itemProduct.idProduct.itemId,true,itemProduct.idProduct.name);
                setRender(props=>(!props))
                setProducts((props) => {
                    props.splice(i, 1);
                    const newData = [...props]
                    return newData
                });
                weightRef[i].current.value  =''
                heightRef[i].current.value =''
                lengthRef[i].current.value =''
                widthRef[i].current.value =''
            }
        }
    };
    const handleClickShopShip = async(itemProduct, i,item)=>{
        try {
            const data = await confirm(idOrder,itemProduct._id,null,null,null,null)
            setRender(props=>(!props))
                setProducts((props) => {
                    props.splice(i, 1);
                    const newData = [...props]
                    return newData
                });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={cx('wrapper')}>
            {products.length > 0 && (
                <>
                    <div className={cx('buyer')}>
                        <img src={avatar} alt={name} />
                        <div className={cx('info-buyer')}>
                            <h1>{`${item.toName} - ${item.toPhoneNumber}`}</h1>
                            <h2>{`Địa chỉ: ${item.address}`}</h2>
                            <h2>{`Địa chỉ cụ thể: ${item.toSpecificAddress}`}</h2>
                            <h2>{`Ghi chú: ${item?.note}`}</h2>
                        </div>
                    </div>
                    <h1>Sản phẩm</h1>
                </>
            )}
            {products.map((itemProduct, i) => {
                weightRef[i] = createRef(null);
                heightRef[i] = createRef(null);
                widthRef[i] = createRef(null);
                lengthRef[i] = createRef(null);
                return(
                <div key={itemProduct._id} className={cx('product')}>
                    <img src={itemProduct.image} alt={'anh san pham'} />
                    <div className={cx('info-product')}>
                        <h1>{`${itemProduct?.idProduct?.name}`}</h1>
                        <h2>{`Size: ${itemProduct?.size} - Số lượng: ${itemProduct?.number} - Giá: ${dotMoney(itemProduct?.price)}VND`}</h2>
                        
                    </div>
                    <div className={cx('info-item')}>
                        <p>Thông tin đơn hàng</p>
                        <input ref={weightRef[i]} placeholder="khối lượng" type="number" min={0}/>
                        <input ref={heightRef[i]} placeholder="Chiều cao" type="number" min={0}/>
                        <input ref={widthRef[i]} placeholder="Chiều rộng" type="number" min={0}/>
                        <input ref={lengthRef[i]} placeholder="Chiều dài" type="number" min={0}/>
                    </div>
                    <div>
                        <Button ishover onClick={() => handleClickConfirm(itemProduct, i,item)} classNames={cx('btn')}>
                            GHN
                        </Button>
                        <Button ishover onClick={() => handleClickShopShip(itemProduct, i,item)} classNames={cx('btn')}>
                            Shop giao
                        </Button>
                    </div>
                </div>
            )})}
            {products.length > 0 && <span></span>}
        </div>
    );
}

export default Card;
