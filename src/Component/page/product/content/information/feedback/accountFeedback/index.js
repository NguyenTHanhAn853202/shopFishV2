import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import ShowStar from '~/Component/showStar';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Button from '~/button';
import Input from '~/Input';
import { reply as replyRequest } from '~/api-server/feedback';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function AccountFeedback({ data }) {
    const comment = data
    const [reply,setReply] = useState('')
    const date = new Date(data?.createdAt || Date.now());
    const dateString = `${date?.getDate() < 10 ? `0${date?.getDate()}` : date?.getDate()}-${
        date?.getMonth() < 10 ? `0${date?.getMonth()}` : date?.getMonth()
    }-${date?.getFullYear()}`;

    const handleReply = async(e) =>{
        try {
            const response = await replyRequest(comment?._id,reply)
            if(response.success){
                comment?.reply.unshift(reply)
                setReply('')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
            <div className={cx('wrapper')}>
                <div className={cx('avatar')}>
                    <img className={cx('avatar-img')} src={comment?.userID?.avatar} alt="avatar" />
                </div>
                <div className={cx('feedback')}>
                    <h4 className={cx('name-account')}>{comment?.userID?.name + ' - '+ comment?.userID?.userName}</h4>
                    <ShowStar starCurrent={comment?.starNumber || 1} classNames={cx('star')} />
                    <h4 className={cx('date-type')}>{dateString}</h4>
                    <p className={cx('content-feedback')}>{comment?.message}</p>
                    {['manager','employee'].includes(localStorage?.role) && 
                        <>
                            <Input value={reply} onChange={(e)=>{setReply(e.target.value)}} placeholder='Trả lời' />
                            <Button onClick={handleReply}>Gửi</Button>
                        </>
                    }  
                    {(comment?.reply || []).map((item,index) =><Fragment key={index}>
                        <h3 >Admin trả lời</h3>
                        <p>{item}</p>
                    </Fragment>)}
                </div>
            </div>
            
    );
}

export default AccountFeedback;
