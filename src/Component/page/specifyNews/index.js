import classNames from "classnames/bind";
import styles from './specifyNews.module.scss'
import { useEffect, useState } from "react";
import { specify } from "~/api-server/news";
import { useLocation } from "react-router-dom";
import HeaderEachPage from '~/headerEachPage';
const cx = classNames.bind(styles)

function Specify() {
    const [data,setData] = useState({})
    const location = useLocation()

    useEffect(()=>{
        (async()=>{
            const idNews = location.state?.id
            const data = await specify(idNews)
            setData(data.data)
        })()
    },[])
    return (<div className={cx('wrapper')}>
        
        <h1>{data?.title}</h1>
        <p className={cx('newline')}>{data?.information}</p>
        <div className={cx('image')}>
            {data?.image && <img src={data.image} />}
            {data?.titleImage &&<h4>Hình ảnh: {data.titleImage}</h4>}
        </div>
    </div>);
}

export default Specify;