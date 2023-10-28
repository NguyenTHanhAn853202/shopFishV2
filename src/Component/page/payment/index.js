import styles from './payment.module.scss';
import classNames from 'classnames/bind';
import InfoOfUser from './infoOfUser';
import InfoOfProduct from './infoOfProduct';
import Button from '~/button';
import Default from '~/announcement/accept';
import { useState, useContext, createRef, useMemo, useRef, useEffect } from 'react';
import { Context } from '~/GlobalContext';
import NotifyContainer, { notify } from '~/utils/notification';
import { payment } from '~/api-server/payment';
import { CART } from '~/GlobalContext/key';
import PaypalButton from './PayPalButton';
import InputInfoUser from '~/Component/inputInfoUser';

const cx = classNames.bind(styles);

function Payment() {
    const [agree, setAgree] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [choosedProducts, setChoosedProducts] = useState([]);
    const [codeDiscount, setCodeDiscount] = useState('');
    const [typeOfPayment, setTypeOfPayment] = useState('after');
    const [{ cart }, dispatch] = useContext(Context);
    const refcodeDiscount = useRef();
    const [addressName,setAddressName] = useState('');
    const [address,setAddress] = useState({
        province:'',
        district:'',
        village:''
    })
    const [info,setInfo] = useState({
        toName:'',
        toPhoneNumber:'',
        toSpecificAddress:'',
        note:''
    })
    const refInfoUser = useMemo(() => {
        const refs = [];
        for (let index = 0; index < 4; index++) {
            refs[index] = createRef(null);
        }
        return refs;
    }, []);

    useEffect(() => {
        if (agree) {
            (async () => {
                const data = await payment(choosedProducts, typeOfPayment, codeDiscount,info,address,addressName);
                dispatch({ key: CART, value: data });
                notify('success', 'Đặt hàng thành công');
                setAgree(false);
                setChoosedProducts([]);
            })();
        }
    }, [agree]);

    // function handle event
    const handleClickPayment = async () => {
        const infoUser = [];
        const mapCheckErrorInput = refInfoUser.reduce((first, item, index) => {
            const element = item.current;
            if (element.value.trim() === '' && element.getAttribute('kindof') !== 'note') {
                element.className = element.getAttribute('classnames');
                return false && first;
            } else if (element.getAttribute('kindof') !== 'note') {
                infoUser.push({ title: element.getAttribute('kindof'), value: element.value || '' });
                return first;
            } else {
                element.className = element.className.replace(element.getAttribute('classnames'), '');
                infoUser.push({ title: element.getAttribute('kindof'), value: element.value });
                return true && first;
            }
        }, true);
        if (!mapCheckErrorInput) {
            notify('warning', 'Vui lòng nhập đủ thông tin');
            return;
        }
        
        if (choosedProducts.length > 0) {
            setIsShow(true);
        } else {
            setIsShow(false);
            notify('warning', 'chưa có sản phẩm nào được chọn', {});
            return;
        }
        setInfo({
            toName:refInfoUser[0].current.value,
            toPhoneNumber:refInfoUser[1].current.value,
            toSpecificAddress:refInfoUser[2].current.value,
            note:refInfoUser[3].current.value
        })
        
        setCodeDiscount(refcodeDiscount.current?.value);
        setTypeOfPayment(typeOfPayment);
        // call API
    };


    return (
        <div className={cx('wrapper', { wrap: true })}>
            <NotifyContainer />
           
            {isShow && (
                <Default
                    title={'Xác nhận'}
                    message={'Bạn có chắc chắn muốn thanh toán'}
                    setAgree={setAgree}
                    setIsShow={setIsShow}
                />
            )}
            <div className={cx('contain', { grid: true })}>
                <div className={cx('layout')}>
                    <div style={{ width: '377px', overflow: 'hidden' }}>
                        <InfoOfUser setAddressName={setAddressName} address={address} setAddress={setAddress}  ref={refInfoUser} />
                    </div>
                    <span className={cx('line-border')}></span>
                    <div style={{ width: '377px', overflow: 'hidden' }}>
                        <InfoOfProduct
                            ref={{ refcodeDiscount }}
                            typePayment={setTypeOfPayment}
                            chooseProduct={[choosedProducts, setChoosedProducts]}
                            type={typeOfPayment}
                        />
                    </div>
                </div>
                <div className={cx('payment')}>
                    {typeOfPayment === 'after' && (
                        <Button
                            classNames={cx('btn', { disabled: choosedProducts.length <= 0 })}
                            onClick={handleClickPayment}
                        >
                            Thanh Toán
                        </Button>
                    )}
                    {typeOfPayment === 'banking' && (
                        <PaypalButton products={choosedProducts} typePayment={setTypeOfPayment} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Payment;
