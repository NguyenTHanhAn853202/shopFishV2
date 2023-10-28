import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import CountNumber from '~/Component/countNumber';
import Button from '~/button';
import { allLogo as logoShip } from '~/media/image/logoShip';
import { allLogo as logoBank } from '~/media/image/logoBank';
import { useState, useContext, useEffect } from 'react';
import { Context as ContextProduct } from '../../ConetextProduct';
import { Context } from '~/GlobalContext';


// import api
import { add } from '~/api-server/cartService';
import { CART } from '~/GlobalContext/key';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Announcement from '~/announcement/announcement';
import NotifyContainer, { notify } from '~/utils/notification';

const cx = classNames.bind(styles);

function Introduct() {
    const [infoProduct, setInfoProduct] = useState({});
    const [iColor, setIColor] = useState();
    const [iSize, setISize] = useState();
    const [size, setSize] = useState([]);
    const [datas, setData] = useContext(ContextProduct);
    const [number, setNumber] = useState(1);
    const [states, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    // handle event
    const { product,nameType } = datas;
    // const { cart } = states;
    const [{category},dispatchContext] = useContext(Context)
    const [image,setImage] = useState(product?.image? product?.image[0]:'');
    const addIntoCart = (e) => {
        (async function () {
            try {
                setIsLoading(true);
                const { success, data,...others } = await add(
                    product?._id,
                    size,
                    number,
                    product?.price,
                    image
                );
                if (success) {
                    dispatch({ key: CART, value: data });
                    notify('success',others.message)
                    setIsLoading(false);
                }
                else{
                    notify('warning',others.message);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    };

    const handleClickChangeImage = (item) => {
        setImage(item)
    }
    useEffect(() => {
        setImage(product?.image? product?.image[0]:'')
        setSize(product.size?product.size[0]:'')
    }, [JSON.stringify(product)]);
    //
    return (
        <div className={cx('wrapper')}>
            <NotifyContainer />
            {addSuccess && <Announcement />}
            <div className={cx('img-product')}>
                {image?.includes('.mp4')? <video controls className={cx('video')}><source src={image} type="video/mp4"/></video> :<img src={image} />}
                <div className={cx('contain-image')}>
                    {(product.image || []).map((item,key)=> {
                        const Tag = item?.includes('.mp4')?'video':'img'
                        return <Tag key={key} onClick={()=>handleClickChangeImage(item)} className={cx('contain-image-item',{active:item === image})} src={item} />
                    })} 
                </div>
            </div>
            <div className={cx('main-info')}>
                <span className={cx('goto')}>
                    <Link className={cx('link')} to="/">
                        TRANG CHỦ
                    </Link>
                    <span>/</span>
                    <Link className={cx('link')} to={`/cua-hang/${nameType?.slug}`}>
                       {nameType?.type?.toUpperCase()}
                    </Link>
                </span>
                <h1 className={cx('name-product')}>{product?.name}</h1>
                <h1 className={cx('price-product')}>{`${product?.price} VNĐ`}</h1>
                <div className={cx('contain-type-number')}>
                    <div className={cx('product-type')}>
                        <span>Kích thước:</span>
                        <div className={cx('product-size')}>
                            {(product?.size || []).map((item, index) => (
                                <button
                                    value={item}
                                    onClick={(e) => {
                                        setInfoProduct((props) => ({ ...props, size: item }));
                                        setISize(index);
                                        setSize(e.target.value);
                                    }}
                                    className={cx({ active: size === item})}
                                    key={index}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={cx('product-number')}>
                        <h4>Số lượng:</h4>
                        <span>{product?.number}</span>
                    </div>
                </div>
                <div className={cx('count-and-add')}>
                    <CountNumber setNumber={setNumber} number={number} />
                    <Button onClick={addIntoCart} ishover classNames={cx('add-cart')}>
                        {!isLoading ? (
                            'THÊM VÀO GIỎ'
                        ) : (
                            <FontAwesomeIcon className={cx('add-cart__icon-spinner')} icon={faSpinner} />
                        )}
                    </Button>
                </div>
                <div className={cx('ship-paid')}>
                    <div className={cx('ship')}>
                        <h3 className={cx('title-logo')}>Tính phí ship tự động</h3>
                        <div className={cx('list-logo')}>
                            {logoShip.map((item, index) => (
                                <img key={index} className={cx('img-ship')} src={item} />
                            ))}
                        </div>
                    </div>
                    <div className={cx('add')}>
                        <h3 className={cx('title-logo')}>Thanh toán</h3>
                        <div className={cx('list-logo')}>
                            {logoBank.map((item, index) => (
                                <img key={index} className={cx('img-ship')} src={item} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('category')}>
                    <span>Danh mục:</span>
                    {category.map((item,index)=> <Link key={index} to={`/cua-hang/${item.slug}`}>
                        {`${item.type}${index<category.length-1?',':''}`}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Introduct;
