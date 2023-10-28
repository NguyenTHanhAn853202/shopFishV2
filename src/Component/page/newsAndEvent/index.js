import classNames from "classnames/bind";
import styles from './newsAndEvent.module.scss'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { show } from "~/api-server/news";
import HeaderEachPage from '~/headerEachPage';
const cx = classNames.bind(styles)

function NewsAndEvent() {
    const [data,setData]  = useState([])

    const navigate = useNavigate()

    const handleNavigate = (id) => {
        navigate('/chi-tiet-tin-tuc',{state:{id:id}})
    }

    useEffect(()=>{
        (async () => {
            try {
                const data = await show()
                setData(data.data)
            } catch (error) {
                console.log(error);
            }
        })()
    },[])

    return (<div className={cx('wrapper')}>
        < HeaderEachPage title={'Tin Tức'} />
        <br></br>
        <div className={cx('contain')}>
            {data.map((item,index)=><div key={index} className={cx('news')}>
                <div className={cx('image')}>
                    <img src={item.image} />
                </div>
                <div className={cx('info')}>
                    <h2>{item.title}</h2>
                    <p>{item.information}</p>
                    <span onClick={()=>handleNavigate(item._id)}>Đọc tiếp</span>
                </div>
            </div>)}
        </div>
        <br></br>
    </div>);

}

export default NewsAndEvent;