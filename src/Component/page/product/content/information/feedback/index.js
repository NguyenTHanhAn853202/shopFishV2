import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import ShowStar from '~/Component/showStar';
import { useContext, useEffect, useMemo, useState } from 'react';
import AccountFeedback from './accountFeedback';
import { showFeedback } from '~/api-server/feedback';
import { Context } from '../../../ConetextProduct';
import WriteFeedback from './writeFeedback';
const cx = classNames.bind(styles);

function Feedback() {
    const [data, setData] = useState([]);
    const [states, dispatch] = useContext(Context);



    const averageStars = useMemo(()=>{
        return Math.floor((data.reduce((first,item,index)=> item.starNumber+first,0)/(data.length || 1))*10)/10
    },[JSON.stringify(data)])
    
    useEffect(() => {
        (async () => {
            try {
                const data = await showFeedback(states?.product?._id);
                setData(data)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [states?.product?._id]);
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('main-title')}>ĐÁNH GIÁ SẢN PHẨM</h1>
            {data.length>0 ? (
                <>
                    <div className={cx('header')}>
                        <div className={cx('average-star')}>
                            <h3 className={cx('current-star')}>
                                {averageStars} <span> trên 5</span>
                            </h3>
                            <div className={cx('show-stars')}>
                                <ShowStar  starCurrent={averageStars} />
                            </div>
                        </div>
                        
                    </div>
                    <WriteFeedback   setData={setData} idProduct={states?.product?._id} />
                    <div className={cx('content-feedback')}>
                        {console.log('redner')}
                        {data.map((item, index) => (
                            <AccountFeedback key={index} data={item} />
                        ))}
                      
                    </div>
                </>
            ) : (
                <>
                    <span className={cx('empty-feedback')}>Chưa có đánh giá nào cho sản phẩm này</span>
                    <WriteFeedback setData={setData} idProduct={states?.product?._id}/>
                </>
            )}
        </div>
    );
}

export default Feedback;
