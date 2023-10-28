import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import Button from '~/button';
import { useContext, useEffect, useState } from 'react';

import Description from './description';
import OtherInfo from './otherInfo';
import Feedback from './feedback';
import { Context } from '../../ConetextProduct';
const cx = classNames.bind(styles);

function Information() {
    const [part, setPart] = useState(2);
    const [Item, setItem] = useState(<Description />);
    const [states, dispatch] = useContext(Context);
    const handleClick = (e) => {
        let index = e.target.getAttribute('index');
        index = Number(index); // ép kiểu
        setPart(index);
    };

    useEffect(() => {
        if (part === 1) {
            setItem(<Description />);
        } else {
            setItem(<Feedback />);
        }
    }, [part]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('contain-btn-function')}>
                <Button onClick={handleClick} classNames={cx('btn-decretion', { active: part === 1 })} index={1}>
                    MÔ TẢ
                </Button>
                <Button onClick={handleClick} classNames={cx('btn-feedback', { active: 2 === part })} index={2}>
                    ĐÁNH GIÁ
                </Button>
            </div>
            <div className={cx('content')}>{Item}</div>
        </div>
    );
}

export default Information;
