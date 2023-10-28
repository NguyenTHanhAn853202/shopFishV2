import classNames from "classnames/bind";
import styles from './writeFeedback.module.scss'
import ShowStar from "~/Component/showStar";
import Input from "~/Input";
import { useState } from "react";
import Button from "~/button";
import { write } from "~/api-server/feedback";
import NotifyContainer, { notify } from "~/utils/notification";

const cx  = classNames.bind(styles)

function WriteFeedback({idProduct,setData}) {
    const [stars,setStars] = useState(0);
    const [message,setMessage] = useState('')
    const handleChooseStar = (e)=>{
        setStars(e.currentTarget.getAttribute('data-index')*1);
    }
    const handleWriteFeedback = (e)=>{
        setMessage(e.target.value)
    }
    const handleSendFeedback = async(e)=>{
        try {
            if(stars===0) return notify('warning','Vui lòng chọn số sao đánh giá')
            const data = await write(idProduct,message,stars)
            if(data.success){
                notify('success','Gửi thành công')
                setMessage('')
                setStars(0)
                setData((props)=>{
                    props.unshift(data.data)
                    return [...props]
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return <div className={cx('write-feedback')}>
                <NotifyContainer />
                <span>Viết cảm nhận của bạn</span>
                <ShowStar style={{cursor:'pointer'}} onClick={handleChooseStar} starCurrent={stars} />
                <Input value={message} onChange={handleWriteFeedback} placeholder='Viết bình luận của bạn' />
                <Button onClick={handleSendFeedback}>Gửi</Button>
            </div>;
}

export default WriteFeedback;