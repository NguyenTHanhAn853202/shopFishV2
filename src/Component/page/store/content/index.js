import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import Card from '~/card';
import * as productServer from '~/api-server/productServer';
import { useEffect, useState ,useContext} from 'react';
import { useLocation, useParams, useSearchParams,useNavigate } from 'react-router-dom';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Default from '~/announcement/accept';
import Loading from '~/utils/loading';
import NotifyContainer, { notify } from '~/utils/notification';
import { Context } from '~/GlobalContext';
import { CHANGEPRODUCT } from '~/GlobalContext/key';

const cx = classNames.bind(styles);
function Content() {
    const [data, setData] = useState([]);
    const location = useLocation();
    const params = useParams().slug;
    const [searchParams, setSearchParams] = useSearchParams();
    const [agree, setAgree] = useState(false);
    const [idDelete, setIdDelete] = useState();
    const [numnerDelete, setNumnerDelete] = useState(0)
    const [billItem,setBillItem] = useState({})
    const [isShow, setIsShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state,dispatch] = useContext(Context)

    // navigate
    const navigate = useNavigate()

    // sort
    const column = searchParams.get('column');
    const type = searchParams.get('type');
    const isSort = searchParams.get('_sort');

    const handleClickRemoveProduct = (item, e) => {
        setIsShow(true);
        setIdDelete(item._id);
        setNumnerDelete(item.number*1)
        setBillItem({
            billId: item.billId,
            itemId: item.itemId
        })
    };

    const handleClickModifyProduct = (item, e) => {
        navigate('/modify',{replace:true,state:{product:item,modify:true}})
    }

    const handleClickBought = (item, e) => {
        navigate('/bought-at-store',{state:{product:item}})
    }

    useEffect(() => {
        (async function () {
            const data = params
                ? await productServer.getType(params, { column: column, type: type, _sort: isSort })
                : await productServer.product(location.state?.nameFind || '', {
                      column: column,
                      type: type,
                      _sort: isSort,
                  });
            if (data) setData(data);
        })();
    }, [location.state?.nameFind, params, column, type]);

    useEffect(() => {
        if (agree) {
            (async () => {
                try {
                    setLoading(true);
                    const data = await productServer.deleteProduct(idDelete,numnerDelete,billItem.billId,billItem.itemId);
                    setData((props) => {
                        let newData = [...props];
                        newData = newData.filter((item) => item._id !== data._id);
                        return newData;
                    });
                    dispatch({key:CHANGEPRODUCT,value:data})
                    notify('success', 'Xóa sản phẩm thành công');
                    setLoading(false);
                    setIdDelete('');
                    setAgree(false);
                } catch (error) {
                    notify('error', 'Xóa sản phẩm không thành công');
                    console.log(error);
                }
            })();
        }
    }, [agree]);

    return (
        <div className={cx('wrapper')}>
            <NotifyContainer />
            {loading && <Loading fixed bigSize />}
            {isShow && (
                <Default
                    title={'Xóa sản phẩm'}
                    message={'Bạn có chắc muốn xóa sản phẩm này'}
                    setIsShow={setIsShow}
                    setAgree={setAgree}
                />
            )}
            {data.map((item, index) => {
                let image = item.image.find((img) => !img?.includes('.mp4'));
                if(!image){
                    image = item.image[0]
                }
                return (
                    <div key={index} className={cx('contain-card')}>
                        {
                            (localStorage.role === 'manager' && (
                                <>
                                    <Tippy content="Chỉnh sữa sản phẩm" duration={[300, 200]} animation={'scale'}>
                                        <button className={cx('btn-modify')} onClick={(e) => handleClickModifyProduct(item, e)}>Sửa</button>
                                    </Tippy>
                                    <Tippy content='Mua tại cửa hàng'>
                                        <button className={cx('btn-bought')} onClick={(e) => handleClickBought(item, e)}>Mua tại CH</button>
                                    </Tippy>
                                    <Tippy content="Xóa sản phẩm" duration={[300, 200]} animation={'scale'}>
                                        <button onClick={(e) => handleClickRemoveProduct(item, e)}>Xóa</button>
                                    </Tippy>
                                </>
                            ))}

                        {localStorage.role === 'employee' &&(
                                <>
                                    <Tippy content='Mua tại cửa hàng'>
                                        <button className={cx('btn-bought')} onClick={(e) => handleClickBought(item, e)}>Mua tại CH</button>
                                    </Tippy>
                                </>
                            )}                            

                        <Card
                            href={`/san-pham/${item.slug}`}
                            src={image}
                            alt={item.name}
                            name={item.name}
                            cost={item.price}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default Content;
